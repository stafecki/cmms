-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'MANAGER', 'TECHNICIAN', 'WAREHOUSE', 'OPERATOR') NOT NULL DEFAULT 'OPERATOR',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certifications` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `type` ENUM('SEP', 'FORKLIFT', 'GAS', 'HEIGHT_WORK', 'WELDING', 'OTHER') NOT NULL,
    `issued_at` DATETIME(3) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `is_valid` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `certifications_user_id_idx`(`user_id`),
    INDEX `certifications_expires_at_idx`(`expires_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locations` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('PLANT', 'HALL', 'LINE', 'STATION') NOT NULL,
    `parent_id` VARCHAR(191) NULL,

    INDEX `locations_parent_id_idx`(`parent_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `machines` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `serial_number` VARCHAR(191) NOT NULL,
    `location_id` VARCHAR(191) NOT NULL,
    `operating_hours` DOUBLE NOT NULL DEFAULT 0,
    `purchase_date` DATETIME(3) NOT NULL,
    `purchase_price` DECIMAL(10, 2) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `machines_serial_number_key`(`serial_number`),
    INDEX `machines_location_id_idx`(`location_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `machine_documents` (
    `id` VARCHAR(191) NOT NULL,
    `machine_id` VARCHAR(191) NOT NULL,
    `uploaded_by_id` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `file_path` VARCHAR(191) NOT NULL,
    `version` INTEGER NOT NULL DEFAULT 1,
    `is_latest` BOOLEAN NOT NULL DEFAULT true,
    `uploaded_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `machine_documents_machine_id_idx`(`machine_id`),
    INDEX `machine_documents_machine_id_is_latest_idx`(`machine_id`, `is_latest`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_orders` (
    `id` VARCHAR(191) NOT NULL,
    `machine_id` VARCHAR(191) NOT NULL,
    `reported_by_id` VARCHAR(191) NOT NULL,
    `assigned_to_id` VARCHAR(191) NULL,
    `status` ENUM('NEW', 'IN_PROGRESS', 'WAITING_FOR_PARTS', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'NEW',
    `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL DEFAULT 'MEDIUM',
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `bhp_confirmed` BOOLEAN NOT NULL DEFAULT false,
    `labor_cost` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `parts_cost` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `started_at` DATETIME(3) NULL,
    `closed_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `work_orders_machine_id_idx`(`machine_id`),
    INDEX `work_orders_status_idx`(`status`),
    INDEX `work_orders_assigned_to_id_idx`(`assigned_to_id`),
    INDEX `work_orders_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_order_messages` (
    `id` VARCHAR(191) NOT NULL,
    `work_order_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `sent_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `work_order_messages_work_order_id_idx`(`work_order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `part_categories` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `part_categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parts` (
    `id` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `stock_quantity` INTEGER NOT NULL DEFAULT 0,
    `reorder_point` INTEGER NOT NULL DEFAULT 5,
    `unit_price` DECIMAL(10, 2) NOT NULL,
    `qr_code` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `parts_qr_code_key`(`qr_code`),
    INDEX `parts_category_id_idx`(`category_id`),
    INDEX `parts_stock_quantity_idx`(`stock_quantity`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `work_order_parts` (
    `id` VARCHAR(191) NOT NULL,
    `work_order_id` VARCHAR(191) NOT NULL,
    `part_id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,

    UNIQUE INDEX `work_order_parts_work_order_id_part_id_key`(`work_order_id`, `part_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tool_loans` (
    `id` VARCHAR(191) NOT NULL,
    `part_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `work_order_id` VARCHAR(191) NULL,
    `loaned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `returned_at` DATETIME(3) NULL,

    INDEX `tool_loans_user_id_idx`(`user_id`),
    INDEX `tool_loans_part_id_idx`(`part_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `preventive_plans` (
    `id` VARCHAR(191) NOT NULL,
    `machine_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `interval_hours` INTEGER NULL,
    `interval_days` INTEGER NULL,
    `advance_days` INTEGER NOT NULL DEFAULT 7,
    `checklist` JSON NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `last_run_at` DATETIME(3) NULL,
    `next_run_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `preventive_plans_machine_id_idx`(`machine_id`),
    INDEX `preventive_plans_next_run_at_idx`(`next_run_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `type` ENUM('CRITICAL_FAILURE', 'REORDER_ALERT', 'PREVENTIVE_DUE', 'CERT_EXPIRING', 'WORK_ORDER_ASSIGNED', 'ANNOUNCEMENT') NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `notifications_user_id_is_read_idx`(`user_id`, `is_read`),
    INDEX `notifications_created_at_idx`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `event_logs` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NULL,
    `action` VARCHAR(191) NOT NULL,
    `entity_type` VARCHAR(191) NULL,
    `entity_id` VARCHAR(191) NULL,
    `metadata` JSON NULL,
    `occurred_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `event_logs_user_id_idx`(`user_id`),
    INDEX `event_logs_entity_type_entity_id_idx`(`entity_type`, `entity_id`),
    INDEX `event_logs_occurred_at_idx`(`occurred_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `certifications` ADD CONSTRAINT `certifications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `locations` ADD CONSTRAINT `locations_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `locations`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `machines` ADD CONSTRAINT `machines_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `machine_documents` ADD CONSTRAINT `machine_documents_machine_id_fkey` FOREIGN KEY (`machine_id`) REFERENCES `machines`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `machine_documents` ADD CONSTRAINT `machine_documents_uploaded_by_id_fkey` FOREIGN KEY (`uploaded_by_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_orders` ADD CONSTRAINT `work_orders_machine_id_fkey` FOREIGN KEY (`machine_id`) REFERENCES `machines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_orders` ADD CONSTRAINT `work_orders_reported_by_id_fkey` FOREIGN KEY (`reported_by_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_orders` ADD CONSTRAINT `work_orders_assigned_to_id_fkey` FOREIGN KEY (`assigned_to_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_order_messages` ADD CONSTRAINT `work_order_messages_work_order_id_fkey` FOREIGN KEY (`work_order_id`) REFERENCES `work_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_order_messages` ADD CONSTRAINT `work_order_messages_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parts` ADD CONSTRAINT `parts_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `part_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_order_parts` ADD CONSTRAINT `work_order_parts_work_order_id_fkey` FOREIGN KEY (`work_order_id`) REFERENCES `work_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `work_order_parts` ADD CONSTRAINT `work_order_parts_part_id_fkey` FOREIGN KEY (`part_id`) REFERENCES `parts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tool_loans` ADD CONSTRAINT `tool_loans_part_id_fkey` FOREIGN KEY (`part_id`) REFERENCES `parts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tool_loans` ADD CONSTRAINT `tool_loans_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tool_loans` ADD CONSTRAINT `tool_loans_work_order_id_fkey` FOREIGN KEY (`work_order_id`) REFERENCES `work_orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `preventive_plans` ADD CONSTRAINT `preventive_plans_machine_id_fkey` FOREIGN KEY (`machine_id`) REFERENCES `machines`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `event_logs` ADD CONSTRAINT `event_logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
