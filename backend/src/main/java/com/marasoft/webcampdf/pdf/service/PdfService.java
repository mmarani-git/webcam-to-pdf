package com.marasoft.webcampdf.pdf.service;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import com.marasoft.webcampdf.configuration.WorkDir;

@Component
public class PdfService {
	private static final Logger logger = LoggerFactory.getLogger(PdfService.class);
	
	@Autowired
	private WorkDir workDir;
	
	@Value("${deleteImmediately}")
	private boolean deleteImmediately;
	
	public File createPdf(List<String> pagesBase64, String fileName) {
		List<File> images = pagesBase64.stream().map(base64 -> base64ToFile(base64)).collect(Collectors.toList());
		File outputFile = new File(workDir.getOutputDir(), fileName);
		
		createPdf(images, outputFile);
		return outputFile;
	}

	private void createPdf(List<File> images, File outputFile) {
		logger.info("Creating document "+outputFile);
		Document document = initializeDocument(outputFile);
		document.open();
		for (File image : images) {
			addImageAsPage(document, image);
		}
		document.close();
		
		logger.info("Document created");
	}
	
	private void addImageAsPage(Document document, File imageFile) {
		try {
			document.newPage();
			com.itextpdf.text.Image image = com.itextpdf.text.Image.getInstance(imageFile.getAbsolutePath());
			image.setAbsolutePosition(0, 0);
			image.setBorderWidth(0);
			image.scaleToFit(PageSize.A4);
			document.add(image);
			if (deleteImmediately) {
				imageFile.delete();
			}
		} catch (Exception e) {
			throw new PdfException(e);
		}
	}

	private Document initializeDocument(File outputFile) {
		Document document = new Document();

		if (outputFile.exists()) {
			outputFile.delete();
		}

		try {
			PdfWriter.getInstance(document, new FileOutputStream(outputFile));
		} catch (FileNotFoundException | DocumentException e) {
			throw new PdfException(e);
		}
		return document;
	}

	private byte[] base64ToBytes(String base64) {
		return Base64.getDecoder().decode(removeStringHeader(base64));
	}
	
	BufferedImage base64ToImage(String base64) {
		BufferedImage image = null;

		try {
			byte[] imageByte = base64ToBytes(base64);
			ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
			image = ImageIO.read(bis);
			bis.close();
		} catch (Exception e) {
			throw new PdfException(e);
		}
		return image;
	}

	private BufferedImage rotateClockwise90(BufferedImage src) {
	    int width = src.getWidth();
	    int height = src.getHeight();

	    BufferedImage dest = new BufferedImage(height, width, src.getType());

	    Graphics2D graphics2D = dest.createGraphics();
	    graphics2D.translate((height - width) / 2, (height - width) / 2);
	    graphics2D.rotate(Math.PI / 2, height / 2, width / 2);
	    graphics2D.drawRenderedImage(src, null);

	    return dest;
	}
	
	private File base64ToFile(String base64) {
		String format = getFormat(base64);
		try {
			File file = File.createTempFile("webcam-to-pdf", "."+format, workDir.getTempDir());
			file.deleteOnExit();
			if (ImageIO.write(rotateClockwise90(base64ToImage(base64)),format,file)) {
				return file;
			} else {
				throw new PdfException("Error while creating temp file");
			}
		} catch (IOException e) {
			throw new PdfException(e);
		}
	}
	
	String getFormat(String base64) {
		int pos1 = base64.indexOf("/");
		int pos2 = base64.indexOf(";");
		return base64.substring(pos1+1, pos2);
	}

	String removeStringHeader(String base64) {
		return base64.substring(base64.indexOf(",") + 1);
	}
}
