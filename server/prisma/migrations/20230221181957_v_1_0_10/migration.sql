/*
  Warnings:

  - You are about to drop the column `Links` on the `Preference` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Preference" DROP COLUMN "Links",
ADD COLUMN     "links" JSONB;
