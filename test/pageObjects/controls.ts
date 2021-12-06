export function uiButton (label) {
    return $(`//button[normalize-space(.)="${label}"]`);
}

export function uiTextbox (label) {
    return $(`//*[text()="${label}"]/following::input[1]`);
}

export function uiRadio(label) {
    return $(`//span[text()="${label}"]/..//input[@type='radio']`);
}

export function uiMenu (label) {
    return $(`//a[@role='button'][.="${label}"]`);
}

export function uiCheckbox (label) {
    return $(`//input[@type="checkbox"][@name="${label}"]`);
}
