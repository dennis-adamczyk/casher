-- CreateTable
CREATE TABLE "Bank_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "holder" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "balance" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Analysis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bank_account_id" TEXT NOT NULL,
    "data_id" TEXT NOT NULL,
    CONSTRAINT "Analysis_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "Bank_Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Analysis_data_id_fkey" FOREIGN KEY ("data_id") REFERENCES "Analysis_Data" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Analysis_Data" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" TEXT
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Goal_History" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "values" TEXT NOT NULL DEFAULT '[]'
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "emojiIcon" TEXT,
    "target_amount" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "savings_amount" INTEGER NOT NULL,
    "savings_interval" INTEGER NOT NULL,
    "analysis_data_id" TEXT NOT NULL,
    "bank_account_id" TEXT NOT NULL,
    "history_id" TEXT NOT NULL DEFAULT '-1',
    CONSTRAINT "Goal_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "Bank_Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Goal_analysis_data_id_fkey" FOREIGN KEY ("analysis_data_id") REFERENCES "Analysis_Data" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Goal_history_id_fkey" FOREIGN KEY ("history_id") REFERENCES "Goal_History" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "interval" INTEGER NOT NULL,
    "category_id" TEXT NOT NULL,
    "bank_account_id" TEXT NOT NULL,
    CONSTRAINT "Subscription_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "Bank_Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subscription_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Bank_Account_user_id_key" ON "Bank_Account"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Bank_Account_iban_key" ON "Bank_Account"("iban");

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_bank_account_id_key" ON "Analysis"("bank_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_data_id_key" ON "Analysis"("data_id");

-- CreateIndex
CREATE UNIQUE INDEX "Goal_analysis_data_id_key" ON "Goal"("analysis_data_id");

-- CreateIndex
CREATE UNIQUE INDEX "Goal_history_id_key" ON "Goal"("history_id");
