<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import AdminService from '@/service/AdminService';
import { ref, onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const admins = ref(null);
const filters1 = ref(null);
const loading1 = ref(null);

const adminService = new AdminService();

onBeforeMount(() => {
    adminService.getAdminsList().then((data) => {
        admins.value = data;
        loading1.value = false;
    });
    initFilters1();
});

const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
};

const clearFilter1 = () => {
    initFilters1();
};

const deleteAdmin = id => {
    adminService.deleteAdmin(id).then((data) => {
        admins.value = data.data;
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Admin Deleted', life: 3000 });
    });
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <h5>Filter Menu</h5>
                <DataTable
                    :value="admins"
                    :paginator="true"
                    class="p-datatable-gridlines"
                    :rows="10"
                    dataKey="id"
                    :rowHover="true"
                    v-model:filters="filters1"
                    filterDisplay="menu"
                    :loading="loading1"
                    :filters="filters1"
                    responsiveLayout="scroll"
                    :globalFilterFields="['name', 'email']"
                >
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <div class="flex justify-content-between gap-3">
                                <router-link to="/admins/add" class="p-button p-component p-button-outlined mb-2">Add Admin</router-link>
                            </div>
                            <div class="flex justify-content-between gap-3">
                                <span class="p-input-icon-left mb-2">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters1['global'].value" placeholder="Keyword Search" style="width: 100%" />
                                </span>
                                <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined mb-2" @click="clearFilter1()" />
                            </div>
                        </div>
                    </template>
                    <template #empty> No admins found. </template>
                    <template #loading> Loading admins data. Please wait. </template>
                    <Column field="id" header="Id" style="min-width: 12rem" :showFilterMatchModes="false" >
                        <template #body="{ data }">
                            {{ data.id }}
                        </template>
                    </Column>
                    <Column header="Name" filterField="name" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.name }}</span>
                        </template>
                    </Column>
                    <Column header="Email" filterField="email" :showFilterMatchModes="false" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                        <template #body="{ data }">
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.email }}</span>
                        </template>
                    </Column>
                    <Column header="Action" :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                        <template #body="{ data }">
                            <router-link :to="{ name: 'edit_admins', params: { id: data.id } }">
                                <Button icon="pi pi-pencil" class="p-button-rounded p-button-info p-button-text mr-2 mb-2" />
                            </router-link>
                            <Button @click="deleteAdmin(data.id)" icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text mr-2 mb-2" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
::v-deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
