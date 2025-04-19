async function showAddEditUserPopup(title, user) {
    const { value: formValues } = await Swal.fire({
        title: title,
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Username" value="' + (user?.username || '') + '" ' + (user ? 'disabled' : '') + '>' +
            '<input id="swal-input2" class="swal2-input" placeholder="Password" type="text" value="' + (user?.password || '') + '">' +
            '<input id="swal-input3" class="swal2-input" placeholder="Email" value="' + (user?.email || '') + '">',
        focusConfirm: false,
        allowEnterKey: true, // Enable Enter key to trigger OK button
        preConfirm: () => {
            const username = document.getElementById('swal-input1').value.trim();
            const password = document.getElementById('swal-input2').value.trim();
            const email = document.getElementById('swal-input3').value.trim();

            // Validate username and password when adding a new user
            if (!user && (!username || !password)) {
                Swal.showValidationMessage('Username and Password are required.');
                return null;
            }

            // If editing and password is empty, keep the original password
            const finalPassword = user && !password ? user.password : password;

            return {
                username: username,
                password: finalPassword,
                email: email
            };
        },
        backdrop: true // Prevent clicking outside
    });

    return formValues;
}

async function showAddEditProductPopup(title, product) {
    const { value: formValues } = await Swal.fire({
        title: title,
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Product Name" value="' + (product?.name || '') + '">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Price" type="number" value="' + (product?.price || '') + '">' +
            '<input id="swal-input3" class="swal2-input" placeholder="Quantity" type="number" value="' + (product?.quantity || '') + '">',
        focusConfirm: false,
        allowEnterKey: true, // Enable Enter key to trigger OK button
        preConfirm: () => {
            const id = product?.id || null; // Keep the ID if editing, null if adding
            const name = document.getElementById('swal-input1').value.trim();
            const price = parseFloat(document.getElementById('swal-input2').value);
            const quantity = parseInt(document.getElementById('swal-input3').value);

            // Validate inputs
            if (!name) {
                Swal.showValidationMessage('Product Name is required.');
                return null;
            }
            if (isNaN(price) || price <= 0) {
                Swal.showValidationMessage('Price must be greater than 0.');
                return null;
            }
            if (isNaN(quantity) || quantity <= 0) {
                Swal.showValidationMessage('Quantity must be greater than 0.');
                return null;
            }

            return {
                id: id, // Include the ID if editing
                name: name,
                price: price,
                quantity: quantity
            };
        },
        backdrop: true // Prevent clicking outside
    });

    return formValues || null;
}

async function showAddOrderPopup(users, products) {
    const userOptions = users.map(user => `<option value="${user.id}">${user.username}</option>`).join('');
    const productOptions = products.map(product => `<option value="${product.id}">${product.name}</option>`).join('');

    const { value: formValues } = await Swal.fire({
        title: 'Add Order',
        // html:
        //     `<div style="text-align: left;">
        //         <label for="swal-user" style="display: block; margin-bottom: 5px;">Select User:</label>
        //         <select id="swal-user" class="swal2-input" style="width: 100%; margin-bottom: 15px;">
        //             ${userOptions}
        //         </select>
        //         <label for="swal-product" style="display: block; margin-bottom: 5px;">Select Product:</label>
        //         <select id="swal-product" class="swal2-input" style="width: 100%; margin-bottom: 15px;">
        //             ${productOptions}
        //         </select>
        //         <label for="swal-quantity" style="display: block; margin-bottom: 5px;">Quantity:</label>
        //         <input id="swal-quantity" class="swal2-input" placeholder="Enter quantity" type="number" style="width: 100%; margin-left: 0px;">
        //     </div> `,
        html:
            '<div style="text-align: left;">' +
                `<label for="swal-user" style="display: block; margin-bottom: 5px;">Select User:</label>` +
                `<select id="swal-user" class="swal2-input" style="width: 100%; margin-bottom: 15px;">${userOptions}</select>` +
                `<label for="swal-product" style="display: block; margin-bottom: 5px;">Select Product:</label>` +
                `<select id="swal-product" class="swal2-input" style="width: 100%; margin-bottom: 15px;">${productOptions}</select>` +
                `<label for="swal-quantity" style="display: block; margin-bottom: 5px;">Quantity:</label>` +
                '<input id="swal-quantity" class="swal2-input" placeholder="Quantity" type="number" style="width: 100%; margin-left: 0px;">'+
            '</div>',
        focusConfirm: false,
        allowEnterKey: true, // Enable Enter key to trigger OK button
        preConfirm: () => {
            const userId = parseInt(document.getElementById('swal-user').value);
            const productId = parseInt(document.getElementById('swal-product').value);
            const quantity = parseInt(document.getElementById('swal-quantity').value);

            if (isNaN(quantity) || quantity <= 0) {
                Swal.showValidationMessage('Quantity must be greater than 0.');
                return null;
            }

            return {
                userId: userId,
                productId: productId,
                quantity: quantity
            };
        },
        backdrop: true // Prevent clicking outside
    });

    // Return null if the modal is closed without saving
    return formValues || null;
}

async function showDeleteConfirmation() {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        backdrop: true // Prevent clicking outside
    });

    return result.isConfirmed;
}

async function showSuccessMessage(message) {
    await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
        backdrop: true // Prevent clicking outside
    });
}

async function showErrorMessage(message) {
    await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        backdrop: true // Prevent clicking outside
    });
}