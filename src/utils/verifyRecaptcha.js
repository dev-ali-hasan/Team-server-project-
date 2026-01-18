const verifyRecaptcha = async (token) => {
    const recaptchaResponse = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}&response=${token}`,
        }
    );
    return await recaptchaResponse.json()
};
export default verifyRecaptcha