-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_preferenceId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "Preference"("id") ON DELETE SET NULL ON UPDATE CASCADE;
