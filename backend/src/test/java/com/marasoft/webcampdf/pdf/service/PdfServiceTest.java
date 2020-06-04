package com.marasoft.webcampdf.pdf.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.awt.Image;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.itextpdf.text.pdf.PdfReader;
import com.marasoft.webcampdf.configuration.WorkDir;
import com.marasoft.webcampdf.pdf.service.PdfException;
import com.marasoft.webcampdf.pdf.service.PdfService;

@SpringBootTest
public class PdfServiceTest {
	
	@Autowired
	private PdfService pdfService;
	
	@Autowired
	private WorkDir workDir;
	
	@BeforeEach
	public void initWorkDir() {
		workDir.setWorkDir("target/PdfServiceTest");
	}
	
	@Test
	public void removeStringHeaderTest() {
		assertEquals("ceon",pdfService.removeStringHeader("data:image/jpeg;base64,ceon"));
	}
	
	@Test
	public void base64ToImageTest() throws IOException {
		String contents = get20x30Base64();
		Image image = pdfService.base64ToImage(contents);
		assertEquals(20,image.getWidth(null));
		assertEquals(30,image.getHeight(null));
	}

	private String get20x30Base64() throws IOException {
		String contents = new String(Files.readAllBytes(Paths.get("src/test/resources/test20x30/1.base64")));
		return contents;
	}
	
	@Test
	public void createPdfTest() throws IOException, PdfException {
		List<String> images = new ArrayList<>();
		for (int i = 0; i<5; i++) {
			images.add(get20x30Base64());
		}
		
		PdfReader pdfReader = new PdfReader(new FileInputStream(pdfService.createPdf(images, "createPdfTest.pdf")));
		
		assertEquals(5, pdfReader.getNumberOfPages());		
	}
	
	@Test
	public void testGetFormat() {
		String base64 = "data:image/png;base64,Uk";
		assertEquals("png",pdfService.getFormat(base64));
	}
}
