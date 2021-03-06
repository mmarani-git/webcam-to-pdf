package com.marasoft.webcampdf.pdf.controller;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.marasoft.webcampdf.pdf.service.PdfException;
import com.marasoft.webcampdf.pdf.service.PdfService;

@RestController
@RequestMapping(PdfController.ROOT)
public class PdfController {
	public static final String ROOT="/pdf";
	
	@Autowired
	private PdfService pdfService;
	
	@RequestMapping(value = "/create", method=RequestMethod.POST)
	public void createPdf(@RequestBody final CreatePdfParams params) throws PdfException {
		pdfService.createPdf(Arrays.asList(params.getScreenshoots()),params.getFileName());
	}
}
