ALTER TABLE `vip_levels`
  ADD COLUMN `is_admin_only` tinyint(1) NOT NULL DEFAULT 0;

INSERT INTO `vip_levels` (
  `id`,
  `level`,
  `max_stories`,
  `created_at`,
  `price`,
  `nickname`,
  `is_admin_only`
) VALUES (
  'dc8e36b6-e17d-11ef-b20c-cecd02c24f24',
  6,
  999,
  '2025-02-02 08:53:35',
  '0',
  'Admin',
  1
);
