/*
  Warnings:

  - You are about to drop the `event_logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `event_logs` DROP FOREIGN KEY `event_logs_user_id_fkey`;

-- DropTable
DROP TABLE `event_logs`;
