function readUInt16(view: DataView, offset: number) {
  return view.getUint16(offset, true);
}

function readUInt32(view: DataView, offset: number) {
  return view.getUint32(offset, true);
}

async function inflateRaw(data: Uint8Array) {
  if (typeof DecompressionStream === "undefined") {
    throw new Error("This browser does not support DOCX extraction.");
  }

  const stream = new Blob([data]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  const response = new Response(stream);
  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}

async function extractZipEntry(file: File, targetName: string) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  let offset = 0;

  while (offset + 30 <= bytes.length) {
    const signature = readUInt32(view, offset);
    if (signature !== 0x04034b50) {
      break;
    }

    const compression = readUInt16(view, offset + 8);
    const compressedSize = readUInt32(view, offset + 18);
    const fileNameLength = readUInt16(view, offset + 26);
    const extraLength = readUInt16(view, offset + 28);
    const nameStart = offset + 30;
    const nameEnd = nameStart + fileNameLength;
    const fileName = new TextDecoder().decode(bytes.slice(nameStart, nameEnd));
    const dataStart = nameEnd + extraLength;
    const dataEnd = dataStart + compressedSize;

    if (fileName === targetName) {
      const compressedData = bytes.slice(dataStart, dataEnd);

      if (compression === 0) {
        return compressedData;
      }

      if (compression === 8) {
        return inflateRaw(compressedData);
      }

      throw new Error("Unsupported DOCX compression method.");
    }

    offset = dataEnd;
  }

  throw new Error("DOCX document content was not found.");
}

function decodeXmlEntities(input: string) {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export async function extractTextFromDocx(file: File) {
  const documentXmlBytes = await extractZipEntry(file, "word/document.xml");
  const xml = new TextDecoder().decode(documentXmlBytes);

  const normalized = xml
    .replace(/<w:p\b[^>]*>/g, "\n")
    .replace(/<\/w:p>/g, "\n")
    .replace(/<w:tab\/>/g, "\t")
    .replace(/<w:br\/>/g, "\n");

  const text = decodeXmlEntities(normalized.replace(/<[^>]+>/g, " "))
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

  return text;
}
