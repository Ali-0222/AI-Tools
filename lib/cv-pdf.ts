import { PDFDocument, PDFPage, PDFFont, StandardFonts, rgb } from "pdf-lib";

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

type Section = {
  title: string;
  text: string;
};

type PageState = {
  page: PDFPage;
  pageNumber: number;
  y: number;
  contentX: number;
  contentWidth: number;
};

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);
  return rgb(((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255);
}

function tintColor(color: ReturnType<typeof rgb>, amount: number) {
  return rgb(
    color.red + (1 - color.red) * amount,
    color.green + (1 - color.green) * amount,
    color.blue + (1 - color.blue) * amount
  );
}

function splitLongWord(word: string, width: number, font: PDFFont, fontSize: number) {
  const parts: string[] = [];
  let current = "";

  for (const char of word) {
    const next = `${current}${char}`;
    if (!current || font.widthOfTextAtSize(next, fontSize) <= width) {
      current = next;
      continue;
    }

    parts.push(current);
    current = char;
  }

  if (current) {
    parts.push(current);
  }

  return parts;
}

function wrapText(text: string, width: number, font: PDFFont, fontSize: number) {
  const paragraphs = text.split(/\r?\n/);
  const lines: string[] = [];

  paragraphs.forEach((paragraph) => {
    if (!paragraph.trim()) {
      lines.push("");
      return;
    }

    let current = "";
    const words = paragraph.split(/\s+/).flatMap((word) => {
      if (font.widthOfTextAtSize(word, fontSize) <= width) {
        return [word];
      }

      return splitLongWord(word, width, font, fontSize);
    });

    words.forEach((word) => {
      const next = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(next, fontSize) <= width) {
        current = next;
        return;
      }

      if (current) {
        lines.push(current);
      }
      current = word;
    });

    if (current) {
      lines.push(current);
    }
  });

  return lines;
}

function drawTemplateChrome({
  page,
  layout,
  accentColor,
  width,
  height,
  margin
}: {
  page: PDFPage;
  layout: TemplateLayout;
  accentColor: ReturnType<typeof rgb>;
  width: number;
  height: number;
  margin: number;
}) {
  if (layout === "sidebar") {
    page.drawRectangle({ x: 0, y: 0, width: 170, height, color: accentColor });
    return;
  }

  if (layout === "modern") {
    page.drawRectangle({ x: 0, y: height - 146, width, height: 146, color: accentColor });
    return;
  }

  page.drawRectangle({ x: margin, y: height - 110, width: width - margin * 2, height: 5, color: accentColor });
}

function drawWrappedLines({
  page,
  text,
  x,
  y,
  width,
  font,
  size,
  lineHeight,
  color
}: {
  page: PDFPage;
  text: string;
  x: number;
  y: number;
  width: number;
  font: PDFFont;
  size: number;
  lineHeight: number;
  color: ReturnType<typeof rgb>;
}) {
  const lines = wrapText(text, width, font, size);
  let currentY = y;

  lines.forEach((line) => {
    if (line) {
      page.drawText(line, { x, y: currentY, size, font, color });
    }
    currentY -= lineHeight;
  });

  return currentY;
}

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
  const pageSize: [number, number] = [595.28, 841.89];
  const width = pageSize[0];
  const height = pageSize[1];
  const margin = 42;
  const footerY = 18;
  const bottomLimit = 56;
  const accentColor = hexToRgb(accent);
  const dark = rgb(0.14, 0.17, 0.2);
  const muted = rgb(0.42, 0.46, 0.5);
  const white = rgb(1, 1, 1);
  const subtleLine = tintColor(accentColor, 0.7);
  const panelTint = tintColor(accentColor, 0.92);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const leftX = layout === "sidebar" ? 28 : margin;
  const mainX = layout === "sidebar" ? 195 : margin;
  const mainWidth = layout === "sidebar" ? width - mainX - margin : width - margin * 2;
  const sections: Section[] = [
    { title: "Summary", text: form.summary },
    { title: "Experience", text: form.experience },
    { title: "Education", text: form.education },
    { title: "Skills", text: form.skills }
  ];
  const classicPanelWidth = 152;
  const classicGap = 18;
  const modernPanelWidth = 156;
  const modernGap = 18;

  function drawClassicPanel(page: PDFPage, pageNumber: number, separatorY: number) {
    const panelX = width - margin - classicPanelWidth;
    const panelY = 54;
    const panelTopY = separatorY - 10;
    const panelHeight = panelTopY - panelY;
    const panelInnerX = panelX + 16;
    const panelInnerWidth = classicPanelWidth - 32;

    page.drawRectangle({
      x: panelX,
      y: panelY,
      width: classicPanelWidth,
      height: panelHeight,
      color: panelTint
    });

    let panelContentY = panelY + panelHeight - 30;

    page.drawText("EDUCATION", {
      x: panelInnerX,
      y: panelContentY,
      size: 10,
      font: bold,
      color: accentColor
    });
    panelContentY -= 20;
    panelContentY = drawWrappedLines({
      page,
      text: form.education,
      x: panelInnerX,
      y: panelContentY,
      width: panelInnerWidth,
      font: regular,
      size: 10,
      lineHeight: 15,
      color: muted
    });

    panelContentY -= 12;
    page.drawText("SKILLS", {
      x: panelInnerX,
      y: panelContentY,
      size: 10,
      font: bold,
      color: accentColor
    });
    panelContentY -= 20;
    drawWrappedLines({
      page,
      text: form.skills,
      x: panelInnerX,
      y: panelContentY,
      width: panelInnerWidth,
      font: regular,
      size: 10,
      lineHeight: 15,
      color: muted
    });

    const panelFooter = `${templateName.toUpperCase()} | PAGE ${pageNumber}`;
    page.drawText(panelFooter, {
      x: panelX + classicPanelWidth - 16 - bold.widthOfTextAtSize(panelFooter, 8.5),
      y: panelY + 18,
      size: 8.5,
      font: bold,
      color: muted
    });
  }

  function drawSidebarPanel(page: PDFPage, topY: number) {
    const panelX = 20;
    const panelY = 120;
    const panelWidth = 130;
    const panelHeight = Math.max(170, topY - panelY);

    page.drawRectangle({
      x: panelX,
      y: panelY,
      width: panelWidth,
      height: panelHeight,
      color: white,
      opacity: 0.08,
      borderColor: white,
      borderWidth: 1,
      borderOpacity: 0.15
    });

    let panelContentY = panelY + panelHeight - 22;
    page.drawText("SKILLS", {
      x: panelX + 12,
      y: panelContentY,
      size: 10,
      font: bold,
      color: white
    });
    panelContentY -= 18;

    drawWrappedLines({
      page,
      text: form.skills,
      x: panelX + 12,
      y: panelContentY,
      width: panelWidth - 24,
      font: regular,
      size: 9.2,
      lineHeight: 12,
      color: white
    });

    page.drawText(templateName.toUpperCase(), {
      x: panelX + 12,
      y: panelY + 18,
      size: 8.2,
      font: bold,
      color: white
    });
  }

  function drawModernPanel(page: PDFPage, pageNumber: number, topY: number) {
    const panelX = width - margin - modernPanelWidth;
    const panelY = 64;
    const panelHeight = Math.max(250, topY - panelY);
    const panelInnerX = panelX + 16;
    const panelInnerWidth = modernPanelWidth - 32;

    page.drawRectangle({
      x: panelX,
      y: panelY,
      width: modernPanelWidth,
      height: panelHeight,
      color: panelTint
    });

    let panelContentY = panelY + panelHeight - 28;
    page.drawText("EDUCATION", {
      x: panelInnerX,
      y: panelContentY,
      size: 10,
      font: bold,
      color: accentColor
    });
    panelContentY -= 20;
    panelContentY = drawWrappedLines({
      page,
      text: form.education,
      x: panelInnerX,
      y: panelContentY,
      width: panelInnerWidth,
      font: regular,
      size: 10,
      lineHeight: 15,
      color: muted
    });

    panelContentY -= 12;
    page.drawText("SKILLS", {
      x: panelInnerX,
      y: panelContentY,
      size: 10,
      font: bold,
      color: accentColor
    });
    panelContentY -= 20;
    drawWrappedLines({
      page,
      text: form.skills,
      x: panelInnerX,
      y: panelContentY,
      width: panelInnerWidth,
      font: regular,
      size: 10,
      lineHeight: 15,
      color: muted
    });

    const panelFooter = `PAGE ${pageNumber}`;
    page.drawText(panelFooter, {
      x: panelX + modernPanelWidth - 16 - bold.widthOfTextAtSize(panelFooter, 8.5),
      y: panelY + 18,
      size: 8.5,
      font: bold,
      color: muted
    });
  }

  function createPage(pageNumber: number) {
    const page = pdf.addPage(pageSize);
    if (layout !== "classic") {
      drawTemplateChrome({ page, layout, accentColor, width, height, margin });
    }

    if (layout === "classic") {
      const headerTopY = height - 28;
      const nameY = height - 72;
      const jobTitleY = height - 102;
      const contactY = height - 124;
      const separatorY = height - 145;
      const classicContentWidth =
        pageNumber === 1 ? width - margin * 2 - classicPanelWidth - classicGap : width - margin * 2;

      page.drawRectangle({
        x: margin,
        y: headerTopY,
        width: 66,
        height: 4,
        color: accentColor
      });

      page.drawText(form.fullName, {
        x: margin,
        y: nameY,
        size: 28,
        font: bold,
        color: dark
      });

      page.drawText(form.jobTitle, {
        x: margin,
        y: jobTitleY,
        size: 11.5,
        font: regular,
        color: muted
      });

      const contactWidth = 150;
      [form.email, form.phone, form.location].forEach((item, index) => {
        drawWrappedLines({
          page,
          text: item,
          x: margin + index * 150,
          y: contactY,
          width: contactWidth,
          font: regular,
          size: 9.5,
          lineHeight: 11,
          color: muted
        });
      });

      page.drawRectangle({
        x: margin,
        y: separatorY,
        width: width - margin * 2,
        height: 1,
        color: subtleLine
      });

      if (pageNumber === 1) {
        drawClassicPanel(page, pageNumber, separatorY);
      }

      return {
        page,
        pageNumber,
        y: separatorY - 26,
        contentX: margin,
        contentWidth: classicContentWidth
      };
    }

    if (layout === "modern") {
      const headerTop = height;
      const headerBottom = height - 146;
      const headerCenter = (headerTop + headerBottom) / 2;
      const nameY = headerCenter + 6;
      const jobTitleY = headerCenter - 22;
      const contactsY = headerCenter - 46;
      const contentTopY = height - 190;
      const modernContentWidth =
        pageNumber === 1 ? width - margin * 2 - modernPanelWidth - modernGap : width - margin * 2;

      page.drawText(form.fullName, {
        x: margin,
        y: nameY,
        size: 22,
        font: bold,
        color: white
      });

      page.drawText(form.jobTitle, {
        x: margin,
        y: jobTitleY,
        size: 12,
        font: regular,
        color: white
      });

      [form.email, form.phone, form.location].forEach((item, index) => {
        drawWrappedLines({
          page,
          text: item,
          x: margin + index * 150,
          y: contactsY,
          width: 145,
          font: regular,
          size: 9.5,
          lineHeight: 11,
          color: white
        });
      });

      if (pageNumber === 1) {
        drawModernPanel(page, pageNumber, contentTopY);
      }

      return {
        page,
        pageNumber,
        y: contentTopY,
        contentX: margin,
        contentWidth: modernContentWidth
      };
    }

    if (layout === "sidebar") {
      let sideY = height - 72;
      sideY = drawWrappedLines({
        page,
        text: form.fullName,
        x: leftX,
        y: sideY,
        width: 120,
        font: bold,
        size: 20,
        lineHeight: 22,
        color: white
      });
      sideY -= 4;
      sideY = drawWrappedLines({
        page,
        text: form.jobTitle,
        x: leftX,
        y: sideY,
        width: 120,
        font: regular,
        size: 10,
        lineHeight: 12,
        color: white
      });
      sideY -= 10;

      [form.email, form.phone, form.location].forEach((item) => {
        sideY = drawWrappedLines({
          page,
          text: item,
          x: leftX,
          y: sideY,
          width: 120,
          font: regular,
          size: 9,
          lineHeight: 11,
          color: white
        });
        sideY -= 3;
      });

      drawSidebarPanel(page, sideY - 18);

      return {
        page,
        pageNumber,
        y: height - 72,
        contentX: mainX,
        contentWidth: mainWidth
      };
    }

    const headerColor = layout === "modern" ? white : dark;
    const detailColor = layout === "modern" ? white : muted;
    let headerY = height - 72;

    headerY = drawWrappedLines({
      page,
      text: form.fullName,
      x: leftX,
      y: headerY,
      width: width - margin * 2,
      font: bold,
      size: 24,
      lineHeight: 24,
      color: headerColor
    });
    headerY -= 4;
    headerY = drawWrappedLines({
      page,
      text: form.jobTitle,
      x: leftX,
      y: headerY,
      width: width - margin * 2,
      font: regular,
      size: 12,
      lineHeight: 14,
      color: detailColor
    });
    headerY -= 10;

    [form.email, form.phone, form.location].forEach((item) => {
      headerY = drawWrappedLines({
        page,
        text: item,
        x: leftX,
        y: headerY,
        width: width - margin * 2,
        font: regular,
        size: 10,
        lineHeight: 12,
        color: detailColor
      });
      headerY -= 2;
    });

    const contentStartY = layout === "modern" ? Math.min(height - 165, headerY - 12) : Math.min(height - 145, headerY - 14);

    return {
      page,
      pageNumber,
      y: contentStartY,
      contentX: mainX,
      contentWidth: mainWidth
    };
  }

  function drawSection(state: PageState, section: Section) {
    const lines = wrapText(section.text, state.contentWidth, regular, 10);
    let lineIndex = 0;
    let continued = false;

    if (!lines.length) {
      if (state.y - 30 < bottomLimit) {
        state = createPage(state.pageNumber + 1);
      }

      state.page.drawText(section.title.toUpperCase(), {
        x: state.contentX,
        y: state.y,
        size: 11,
        font: bold,
        color: accentColor
      });

      return { ...state, y: state.y - 26 };
    }

    while (lineIndex < lines.length) {
      if (state.y - 32 < bottomLimit) {
        state = createPage(state.pageNumber + 1);
      }

      state.page.drawText(continued ? `${section.title.toUpperCase()} (CONT.)` : section.title.toUpperCase(), {
        x: state.contentX,
        y: state.y,
        size: 11,
        font: bold,
        color: accentColor
      });
      state.y -= 18;

      while (lineIndex < lines.length) {
        if (state.y - 14 < bottomLimit) {
          continued = true;
          state = createPage(state.pageNumber + 1);
          break;
        }

        const line = lines[lineIndex];
        if (line) {
          state.page.drawText(line, {
            x: state.contentX,
            y: state.y,
            size: 10,
            font: regular,
            color: muted
          });
        }

        state.y -= 14;
        lineIndex += 1;
      }

      if (lineIndex >= lines.length) {
        state.y -= 10;
      }
    }

    return state;
  }

  let state = createPage(1);
  const flowSections =
    layout === "classic"
      ? sections.slice(0, 2)
      : layout === "modern"
        ? sections.slice(0, 2)
        : layout === "sidebar"
          ? sections.slice(0, 3)
          : sections;

  flowSections.forEach((section) => {
    state = drawSection(state, section);
  });

  const pages = pdf.getPages();
  pages.forEach((page, index) => {
    if (layout === "classic" && index === 0) {
      return;
    }

    const footer = `${templateName} | Page ${index + 1} of ${pages.length}`;
    page.drawText(footer, {
      x: width - margin - bold.widthOfTextAtSize(footer, 9),
      y: footerY,
      size: 9,
      font: bold,
      color: muted
    });
  });

  return pdf.save();
}
