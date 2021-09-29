/**
 *
 * @param {scope de recherche de checkbox} parent
 * @returns array de checkbox cochée
 */
function handleSelect(parent) {
    return new Promise((resolve) => {
        let selected = [];

        if (parent === undefined) {
            document
                .querySelectorAll("input[type='checkbox']")
                .forEach((checkbox) => {
                    if (checkbox.checked) {
                        selected.push(checkbox.id);
                    }
                });
        } else {
            parent
                .querySelectorAll("input[type='checkbox']")
                .forEach((checkbox) => {
                    if (checkbox.checked) {
                        selected.push(checkbox.id);
                    }
                });
        }
        resolve(selected);
    });
}

const selectAllCheckbox = async (parent, checked) => {
    return new Promise((resolve) => {
        parent
            .querySelectorAll("input[type='checkbox']")
            .forEach((checkbox) => {
                checkbox.checked = checked;
            });
    });
};

/**
 *
 * @returns Un array des caractéristiques liées à la sous-catégorie crée
 */
const arrayOfSpecs = (keys) => {
    return new Promise((resolve) => {
        let specsInput = document.querySelectorAll(".spec");
        let specsValues = [];
        if (keys) {
            specsInput.forEach((specName, index) => {
                specsValues.push(keys[index] + ":" + specName.value);
            });
        } else {
            specsInput.forEach((specName, index) => {
                specsValues.push(specName.value);
            });
        }
        resolve(specsValues);
    });
};

/**
 * @param {event} e
 * retourne l'image uploadée en base 64
 */
const convertTo64 = (e) => {
    return new Promise((resolve) => {
        if (e.target.files && e.target.files[0]) {
            var FR = new FileReader();

            FR.addEventListener("load", function (e) {
                let img = e.target.result;
                img = img.split(",");
                let img64 = img[1];
                resolve(img64);
            });

            FR.readAsDataURL(e.target.files[0]);
        }
    });
};

const substractPercentage = (nb, percentage) => {
    let result = nb - nb * (percentage / 100);
    return result.toFixed(2);
};

const getCurrentYear = () => {
    return new Date().getFullYear();
};

export {
    handleSelect,
    convertTo64,
    arrayOfSpecs,
    selectAllCheckbox,
    substractPercentage,
    getCurrentYear,
};
