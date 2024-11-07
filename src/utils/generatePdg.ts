import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

/**
 * HTML এলিমেন্টকে PDF এ রূপান্তর করে একাধিক পৃষ্ঠায় ডাউনলোড শুরু করে।
 * @param elementRef - PDF এ রূপান্তর করার জন্য HTML এলিমেন্টের রেফারেন্স।
 * @param fileName - PDF ফাইলটির নাম।
 */

export const downloadPDF = async (elementRef: React.RefObject<HTMLElement>, fileName: string = "download.pdf") => {
    const element = elementRef.current;

    if (element) {
        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: false
            });

            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();


            // ক্যানভাসের উচ্চতা ও প্রস্থ অনুসারে অনুপাত নির্ধারণ করা
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const pageHeight = (pdfWidth / imgWidth) * imgHeight;
            let position = 0;

            // একাধিক পৃষ্ঠায় কন্টেন্ট যোগ করার জন্য লুপ
            while (position < imgHeight) {
                const sectionCanvas = document.createElement("canvas");

                sectionCanvas.width = imgWidth;
                sectionCanvas.height = pdfHeight * (imgWidth / pdfWidth);

                const sectionContext = sectionCanvas.getContext("2d");

                if (sectionContext) {
                    sectionContext.drawImage(canvas, 0, position, imgWidth, sectionCanvas.height, 0, 0, imgWidth, sectionCanvas.height);

                    const sectionImageData = sectionCanvas.toDataURL("image/png");

                    pdf.addImage(sectionImageData, "PNG", 0, 0, pdfWidth, pageHeight);

                    position += sectionCanvas.height;

                    if (position < imgHeight) {
                        pdf.addPage();
                    }
                }
            }

            pdf.save(fileName);
        } catch (error) {
            console.error("Something went wrong", error);
        }
    } else {
        console.warn("Element not found for create PDF file!");
    }
};
