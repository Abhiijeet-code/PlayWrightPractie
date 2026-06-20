const { test, expect } = require('@playwright/test');
const path = require('path');

test('RAG Pipeline Ingestion and QA E2E Test', async ({ page }) => {
  // Go to the local index.html file
  const htmlPath = path.resolve(__dirname, '../../AITesting/RAG_Pipeline/index.html');
  // Playwright needs file:// prefix and forward slashes
  const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
  console.log(`Navigating to: ${fileUrl}`);
  await page.goto(fileUrl);

  // 1. Verify health check
  const healthLabel = page.locator('#healthLabel');
  await expect(healthLabel).toHaveText('Backend Online', { timeout: 15000 });
  console.log('Backend is verified online.');

  // 2. Upload file
  const fileInput = page.locator('#fileInput');
  const testCasesPath = 'C:\\Abhi\\Amazon_Test_Cases.xlsx';
  await fileInput.setInputFiles(testCasesPath);
  console.log(`Loaded test case file: ${testCasesPath}`);

  // 3. Verify file details card is shown and ingest button is enabled
  const fileInfo = page.locator('#fileInfo');
  await expect(fileInfo).toBeVisible();
  const ingestBtn = page.locator('#ingestBtn');
  await expect(ingestBtn).toBeEnabled();

  // Take screenshot of uploaded file details
  await page.screenshot({ path: 'C:\\Abhi\\PlayWright_Anti\\1_file_loaded.png' });

  // 4. Click ingest button
  await ingestBtn.click();
  console.log('Initiated ingestion pipeline...');

  // Wait for chunk step to complete
  await expect(page.locator('#step-card-chunk')).toHaveClass(/completed/, { timeout: 30000 });
  console.log('Chunking completed.');
  // Wait for embed step to complete
  await expect(page.locator('#step-card-embed')).toHaveClass(/completed/, { timeout: 60000 });
  console.log('Embeddings generation completed.');
  // Wait for index step to complete
  await expect(page.locator('#step-card-index')).toHaveClass(/completed/, { timeout: 60000 });
  console.log('Pinecone indexing completed.');

  // Take screenshot after ingestion completes
  await page.screenshot({ path: 'C:\\Abhi\\PlayWright_Anti\\2_ingestion_complete.png' });

  // 5. Switch to Retrieval & QA tab
  await page.locator('#tabQueryBtn').click();
  console.log('Switched to Retrieval & QA tab.');

  // 6. Submit a query
  const chatInput = page.locator('#chatInput');
  await expect(chatInput).toBeEnabled();
  await chatInput.fill('List some test cases for search functionality');
  await page.locator('#chatSendBtn').click();
  console.log('Submitted search query.');

  // Wait for retrieval search step to complete
  await expect(page.locator('#step-card-v-search')).toHaveClass(/completed/, { timeout: 20000 });
  // Wait for rerank step to complete
  await expect(page.locator('#step-card-rerank')).toHaveClass(/completed/, { timeout: 20000 });
  // Wait for generation step to complete
  await expect(page.locator('#step-card-generate')).toHaveClass(/completed/, { timeout: 40000 });

  // Wait for assistant response to stop streaming (cursor class removed)
  const assistantMsgContent = page.locator('.msg.assistant .content').last();
  await expect(assistantMsgContent).not.toHaveClass(/streaming-cursor/, { timeout: 60000 });
  console.log('Token generation finished.');

  // Take screenshot of QA results and visual telemetry
  await page.screenshot({ path: 'C:\\Abhi\\PlayWright_Anti\\3_qa_complete.png' });
  console.log('Test completed successfully and screenshots saved.');
});
