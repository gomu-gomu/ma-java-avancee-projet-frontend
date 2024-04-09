export default defineEventHandler(async (event) => {
  const config = useAppConfig();
  const users = await $fetch(`${config.api}/user`);

  return users;
});