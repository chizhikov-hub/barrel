/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Units` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[Units] ADD CONSTRAINT [Units_code_key] UNIQUE NONCLUSTERED ([code]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
