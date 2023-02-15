/*
  Warnings:

  - Added the required column `taskList` to the `Day` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Day" ADD COLUMN     "taskList" JSONB NOT NULL;
