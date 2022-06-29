-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "emojiIcon" TEXT,
    "target_amount" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "savings_amount" INTEGER NOT NULL,
    "savings_interval" INTEGER NOT NULL,
    "analysis_data_id" TEXT,
    "bank_account_id" TEXT NOT NULL,
    "history_id" TEXT DEFAULT '-1',
    CONSTRAINT "Goal_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "Bank_Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Goal_analysis_data_id_fkey" FOREIGN KEY ("analysis_data_id") REFERENCES "Analysis_Data" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Goal_history_id_fkey" FOREIGN KEY ("history_id") REFERENCES "Goal_History" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Goal" ("amount", "analysis_data_id", "bank_account_id", "emojiIcon", "history_id", "id", "name", "savings_amount", "savings_interval", "target_amount") SELECT "amount", "analysis_data_id", "bank_account_id", "emojiIcon", "history_id", "id", "name", "savings_amount", "savings_interval", "target_amount" FROM "Goal";
DROP TABLE "Goal";
ALTER TABLE "new_Goal" RENAME TO "Goal";
CREATE UNIQUE INDEX "Goal_analysis_data_id_key" ON "Goal"("analysis_data_id");
CREATE UNIQUE INDEX "Goal_history_id_key" ON "Goal"("history_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
