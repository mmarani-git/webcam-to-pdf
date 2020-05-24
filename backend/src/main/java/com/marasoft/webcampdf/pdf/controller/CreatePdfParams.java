package com.marasoft.webcampdf.pdf.controller;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect
public class CreatePdfParams {
	private String fileName;
	private String[] screenshoots;
	
	public String getFileName() {
		return fileName;
	}
	
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	public String[] getScreenshoots() {
		return screenshoots;
	}
	
	public void setScreenshoots(String[] screenshoots) {
		this.screenshoots = screenshoots;
	}
}
