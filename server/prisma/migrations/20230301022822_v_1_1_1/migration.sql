-- DropForeignKey
ALTER TABLE "Gratitude" DROP CONSTRAINT "Gratitude_userId_fkey";

-- AlterTable
ALTER TABLE "Gratitude" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Gratitude" ADD CONSTRAINT "Gratitude_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
