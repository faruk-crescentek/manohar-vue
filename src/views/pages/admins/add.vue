<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';
import AdminService from '@/service/AdminService';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const admin = ref({});
const submitted = ref(false);

const adminService = new AdminService();

const saveAdmin = () => {
    submitted.value = true;
    if (admin.value.email && admin.value.email.trim() && admin.value.password) {
        
        adminService.createAdmin(admin.value).then((data) => {
            admin.value = {};
            router.push('/admins');
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Admin Created', life: 3000 });
        });
    }
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <h5>Add Admin</h5>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                        <label for="name">Name</label>
                        <InputText id="name" type="text" name="name" v-model.trim="admin.name" autofocus />
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="email">Email</label>
                        <InputText id="email" type="email" name="email" v-model.trim="admin.email" required="true" :class="{ 'p-invalid': submitted && !admin.email }" />
                        <small class="p-invalid" v-if="submitted && !admin.email">Email is required.</small>
                    </div>
                    <div class="field col-12 md:col-6">
                        <label for="password">Password</label> 
                        <InputText id="password" type="text" name="password" v-model.trim="admin.password" required="true" :class="{ 'p-invalid': submitted && !admin.password }"/>
                        <small class="p-invalid" v-if="submitted && !admin.password">Password is required.</small>
                    </div>
                </div>
                <div>
                    <Button label="Reset" class="p-button-secondary mr-2 mb-2" />
                    <Button label="Submit" class="mr-2 mb-2" @click="saveAdmin" />
                </div>
            </div>
        </div>
    </div>
</template>
