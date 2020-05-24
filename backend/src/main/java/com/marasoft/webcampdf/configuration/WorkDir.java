package com.marasoft.webcampdf.configuration;

import java.io.File;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class WorkDir {
	@Value("${workDir}")
	private String workDir;
	
	private File tempDir=null;
	private File outputDir=null;
	
	private synchronized void initOutputDir() {
		outputDir = new File(workDir,"output");
		if (!outputDir.exists()) {
			outputDir.mkdirs();
		}
	}

	private synchronized void initTempDir() {
		tempDir = new File(workDir,"temp");
		
		if (!tempDir.exists()) {
			tempDir.mkdirs();
		}
	}

	public synchronized File getTempDir() {
		if (tempDir == null) {
			initTempDir();
		}
		
		return tempDir;
	}

	public synchronized File getOutputDir() {
		if (outputDir==null) {
			initOutputDir();
		}
		
		return outputDir;
	}
	
	public synchronized void setWorkDir(String workDir) {
		this.workDir = workDir;
		outputDir = null;
		tempDir = null;
	}
}
