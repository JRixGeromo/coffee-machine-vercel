-- CreateTable
CREATE TABLE "coffee_machine_state" (
    "id" SERIAL NOT NULL,
    "waterMl" INTEGER NOT NULL DEFAULT 0,
    "coffeeGrams" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coffee_machine_state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coffee_recipes" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "coffeeGrams" DOUBLE PRECISION NOT NULL,
    "waterMilliliters" INTEGER NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coffee_recipes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coffee_recipes_key_key" ON "coffee_recipes"("key");
