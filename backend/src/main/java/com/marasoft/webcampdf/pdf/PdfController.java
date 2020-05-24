package com.marasoft.webcampdf.pdf;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(PdfController.ROOT)
public class PdfController {
	public static final String ROOT="/pdf";
	
	@Autowired
	private PdfService pdfService;
	
	@RequestMapping(value = "/create", method=RequestMethod.POST)
	public void createPdf(@RequestParam String[] pagesBase64,@RequestParam String fileName) throws PdfException {
		pdfService.createPdf(Arrays.asList(pagesBase64),fileName);
	}
}
