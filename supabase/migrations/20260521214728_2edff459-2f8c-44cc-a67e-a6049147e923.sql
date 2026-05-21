
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.consume_consult(UUID) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.consume_consult(UUID) TO authenticated;
