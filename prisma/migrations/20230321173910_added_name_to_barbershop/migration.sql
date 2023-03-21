/*
  Warnings:

  - Added the required column `name` to the `BarberShop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BarberShop" ADD COLUMN     "name" TEXT NOT NULL;
