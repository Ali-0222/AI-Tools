import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type TemplateLayout = "classic" | "modern" | "sidebar";

type CvForm = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: string;
  education: string;
  skills: string;
};

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);
  return rgb(((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255);
}

function wrapText(text: string, width: number, font: PDFFontLike, fontSize: number) {
  const paragraphs = text.split(/\r?\n/);
  const lines: string[] = [];

  paragraphs.forEach((paragraph) => {
    if (!paragraph.trim()) {
      lines.push("");
      return;
    }

    let current = "";
    paragraph.split(/\s+/).forEach((word) => {
      const test = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(test, fontSize) <= width) {
        current = test;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    });

    if (current) {
      lines.push(current);
    }
  });

  return lines;
}

type PDFFontLike = {
  widthOfTextAtSize: (text: string, size: number) => number;
};

export async function buildCvPdf({
  templateName,
  accent,
  layout,
  form
}: {
  templateName: string;
  accent: string;
  layout: TemplateLayout;
  form: CvForm;
}) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const width = page.getWidth();
  const height = page.getHeight();
  const margin = 42;
  const accentColor = hexToRgb(accent);
  const dark = rgb(0.14, 0.17, 0.2);
  const muted = rgb(0.42, 0.46, 0.5);
  const white = rgb(1, 1, 1);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);

  if (layout === "sidebar") {
    page.drawRectangle({ x: 0, y: 0, width: 170, height, color: accentColor });
  } else if (layout === "modern") {
    page.drawRectangle({ x: 0, y: height - 120, width, height: 120, color: accentColor });
  } else {
    page.drawRectangle({ x: margin, y: height - 110, width: width - margin * 2, height: 4, color: accentColor });
  }

  const leftX = layout === "sidebar" ? 28 : margin;
  const mainX = layout === "sidebar" ? 195 : margin;
  const mainWidth = layout === "sidebar" ? width - mainX - margin : width - margin * 2;

  page.drawText(form.fullName, {
    x: layout === "modern" ? margin : leftX,
    y: height - 72,
    size: 24,
    font: bold,
    color: layout === "modern" ? white : layout === "sidebar" ? white : dark
  });
  page.drawText(form.jobTitle, {
    x: layout === "modern" ? margin : leftX,
    y: height - 96,
    size: 12,
    font: regular,
    color: layout === "modern" ? white : layout === "sidebar" ? white : muted
  });

  const contacts = [form.email, form.phone, form.location];
  let contactY = layout === "sidebar" ? height - 145 : height - 145;
  contacts.forEach((item) => {
    page.drawText(item, {
      x: leftX,
      y: contactY,
      size: 10,
      font: regular,
      color: layout === "sidebar" ? white : muted
    });
    contactY -= 16;
  });

  function drawSection(title: string, text: string, x: number, yStart: number, sectionWidth: number, color = accentColor) {
    page.drawText(title.toUpperCase(), { x, y: yStart, size: 11, font: bold, color });
    let y = yStart - 18;
    wrapText(text, sectionWidth, regular, 10).forEach((line) => {
      if (line) {
        page.drawText(line, { x, y, size: 10, font: regular, color: muted });
      }
      y -= 14;
    });
    return y - 8;
  }

  if (layout === "sidebar") {
    let sideY = contactY - 20;
    sideY = drawSection("Skills", form.skills, leftX, sideY, 120, white);

    let mainY = height - 145;
    mainY = drawSection("Summary", form.summary, mainX, mainY, mainWidth);
    mainY = drawSection("Experience", form.experience, mainX, mainY, mainWidth);
    drawSection("Education", form.education, mainX, mainY, mainWidth);
  } else {
    let y = layout === "modern" ? height - 165 : height - 145;
    y = drawSection("Summary", form.summary, margin, y, mainWidth);
    y = drawSection("Experience", form.experience, margin, y, mainWidth);
    y = drawSection("Education", form.education, margin, y, mainWidth);
    drawSection("Skills", form.skills, margin, y, mainWidth);
  }

  page.drawText(templateName, {
    x: width - margin - bold.widthOfTextAtSize(templateName, 9),
    y: 18,
    size: 9,
    font: bold,
    color: muted
  });

  return pdf.save();
}
