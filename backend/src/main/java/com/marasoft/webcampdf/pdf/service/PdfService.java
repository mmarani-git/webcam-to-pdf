package com.marasoft.webcampdf.pdf.service;

import java.awt.Color;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import com.marasoft.webcampdf.configuration.WorkDir;

@Component
public class PdfService {

	@Autowired
	private WorkDir workDir;

	public File createPdf(List<String> pagesBase64, String fileName) throws PdfException {
		List<Image> images = pagesBase64.stream().map(this::base64ToImage).collect(Collectors.toList());
		File outputFile = new File(workDir.getOutputDir(), fileName);

		return createPdf(images, outputFile);
	}

	private File createPdf(List<Image> awtImages, File outputFile) throws PdfException {
		Document document = initializeDocument(outputFile);

		document.open();
		for (Image awtImage : awtImages) {
			addImageAsPage(document, awtImage);
		}
		document.close();
		
		return outputFile;
	}

	private void addImageAsPage(Document document, Image awtImage) throws PdfException {
		try {
			document.newPage();
			com.itextpdf.text.Image image = com.itextpdf.text.Image.getInstance(awtImage, Color.WHITE);
			image.setAbsolutePosition(0, 0);
			image.setBorderWidth(0);
			image.scaleAbsolute(PageSize.A4);
			document.add(image);
		} catch (Exception e) {
			throw new PdfException(e);
		}
	}

	private Document initializeDocument(File outputFile) throws PdfException {
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

	Image base64ToImage(String base64) {
		String imageContent = removeStringHeader(base64);
		BufferedImage image = null;
		byte[] imageByte;
		try {
			imageByte = Base64.getDecoder().decode(imageContent);
			ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
			image = ImageIO.read(bis);
			bis.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return image;
	}

	String removeStringHeader(String base64) {
		return base64.substring(base64.indexOf(",") + 1);
	}
}
