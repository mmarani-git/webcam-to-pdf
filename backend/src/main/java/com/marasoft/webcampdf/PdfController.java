package com.marasoft.webcampdf;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(PdfController.ROOT)
public class PdfController {
	public static final String ROOT="/pdf";
	
	@Autowired
	private PdfService pdfService;
	
	@RequestMapping(value = "/create", method=RequestMethod.POST)
	public void createPdf(List<String> pagesBase64, String fileName) throws PdfException {
		pdfService.createPdf(pagesBase64,fileName);
	}
}
