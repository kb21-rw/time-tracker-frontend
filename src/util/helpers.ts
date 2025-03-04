export const isFormComplete = (formData: {
    fullName?: string
    email?: string
    password?: string
    confirmPassword?: string
}) => {
    return Boolean(
        formData.fullName?.trim() &&
            formData.email?.trim() &&
            formData.password?.trim() &&
            formData.confirmPassword?.trim(),
    )
}
