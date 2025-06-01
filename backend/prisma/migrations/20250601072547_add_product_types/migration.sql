/*
  Warnings:

  - Added the required column `folderId` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitId` to the `ProductTypes` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Products] ADD [folderId] INT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[ProductTypes] ADD [unitId] INT NOT NULL;

-- CreateTable
CREATE TABLE [dbo].[ProductFolders] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [parentId] INT,
    [path] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ProductFolders_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[ProductFolders] ADD CONSTRAINT [ProductFolders_parentId_fkey] FOREIGN KEY ([parentId]) REFERENCES [dbo].[ProductFolders]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Products] ADD CONSTRAINT [Products_folderId_fkey] FOREIGN KEY ([folderId]) REFERENCES [dbo].[ProductFolders]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProductTypes] ADD CONSTRAINT [ProductTypes_unitId_fkey] FOREIGN KEY ([unitId]) REFERENCES [dbo].[Units]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
