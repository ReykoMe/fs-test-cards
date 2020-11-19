const FB = {
    app_id: 1254056151632104,
    redirect_uri: 'http://localhost:3001/api/auth/facebook',
}
const FB_url =`https://www.facebook.com/v9.0/dialog/oauth?client_id=${ FB.app_id }&redirect_uri=${ FB.redirect_uri }&response_type=code&state=fb-fs-ts-crds`
export { FB_url }