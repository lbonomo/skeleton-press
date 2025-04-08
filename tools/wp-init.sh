#! /bin/bash
# Ahora dentro del contenedor

project_name=$LANDO_APP_PROJECT

wp core download

wp config create \
  --dbname=wordpress \
  --dbuser=wordpress \
  --dbpass=wordpress \
  --dbhost=database

wp core install \
  --url=https://$project_name.lndo.site/ \
  --title="WordPress local para $project_name" \
  --admin_user=admin \
  --admin_password=password \
  --admin_email=admin@$project_name.lndo.site

# Removing useless plugins
wp plugin delete hello
wp plugin delete akismet
wp plugin install query-monitor --activate

# Enabling logs
wp config set WP_DEBUG true --raw
wp config set WP_DEBUG_LOG true --raw
wp config set WP_DEBUG_DISPLAY true --raw
wp config set SCRIPT_DEBUG true --raw

# Permalink structure
wp rewrite structure %postname%
wp rewrite flush --hard
