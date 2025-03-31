<template>
  <div class="card flex justify-center bg-yellow-100">
        <Toast />

        <Form v-slot="$form" :initialValues="initialValues" :resolver="resolver" @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-60">
            <div class="flex flex-col gap-1">
                <InputText name="username" type="text" placeholder="Username" fluid />
                <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error.message }}</Message>
            </div>
            <div class="flex flex-col gap-1">
                <Password name="password" placeholder="Password" :feedback="false" toggleMask fluid />
                <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
                    <ul class="my-0 px-4 flex flex-col gap-1">
                        <li v-for="(error, index) of $form.password.errors" :key="index">{{ error.message }}</li>
                    </ul>
                </Message>
            </div>
            <Button type="submit" severity="secondary" label="Submit" />
        </Form>
    </div>
</template>

<script lang="js" setup>


import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const initialValues = ref({
    username: '',
    password: ''
});

const resolver = zodResolver(
    z.object({
        username: z.string().min(1, { message: 'Username is required.' }),
        password: z
            .string()
            .min(8, { message: 'Minimum 2 characters.' })
            .max(14, { message: 'Maximum 14 characters.' })
            .refine((value) => /[a-z]/.test(value), {
                message: 'Doit avoir 1 minuscule'
            })
            .refine((value) => /[A-Z]/.test(value), {
                message: 'Doit avoir 1 majuscule'
            })
            .refine((value) => /[0-9]/.test(value), {
                message: 'Doit avoir 1 nombre.'
            })
    })
);

const onFormSubmit = (e) => {
    // e.originalEvent: Represents the native form submit event.
    // e.valid: A boolean that indicates whether the form is valid or not.
    // e.states: Contains the current state of each form field, including validity status.
    // e.errors: An object that holds any validation errors for the invalid fields in the form.
    // e.values: An object containing the current values of all form fields.
    // e.reset: A function that resets the form to its initial state.

    if (e.valid) {
        toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
};


</script>

<style>

</style>