SET @column_exists = (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'vip_levels'
    AND COLUMN_NAME = 'is_admin_only'
);

SET @alter_vip_levels = IF(
  @column_exists = 0,
  'ALTER TABLE `vip_levels` ADD COLUMN `is_admin_only` tinyint(1) NOT NULL DEFAULT 0',
  'SELECT 1'
);

PREPARE alter_vip_levels_stmt FROM @alter_vip_levels;
EXECUTE alter_vip_levels_stmt;
DEALLOCATE PREPARE alter_vip_levels_stmt;

UPDATE `vip_levels`
SET `is_admin_only` = 0
WHERE `is_admin_only` IS NULL;

INSERT INTO `vip_levels` (
  `id`,
  `level`,
  `max_stories`,
  `price`,
  `nickname`,
  `is_admin_only`
)
SELECT
  'dc8e36b6-e17d-11ef-b20c-cecd02c24f24',
  6,
  999,
  '0',
  'Admin',
  1
WHERE NOT EXISTS (
  SELECT 1
  FROM `vip_levels`
  WHERE `level` = 6
);
