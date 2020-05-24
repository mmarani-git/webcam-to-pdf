package com.marasoft.webcampdf.pdf.service;

public class PdfException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2225526038249321791L;

	public PdfException() {
	}

	public PdfException(String message) {
		super(message);
	}

	public PdfException(Throwable cause) {
		super(cause);
	}

	public PdfException(String message, Throwable cause) {
		super(message, cause);
	}

	public PdfException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

}
