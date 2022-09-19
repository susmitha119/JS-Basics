<template>
    <div>
        <div>
            <searchBar :temp='link' @searching="tableSearch" />
        </div>



        <v-form refs="forms">
            <v-dialog width="500" v-model="dialog">

                <template v-slot:activator="{ on, attrs }">
                    <v-flex text-right align-right>
                        <v-btn color="primary" v-bind="attrs" v-on="on">
                            Add new
                        </v-btn>
                    </v-flex>
                </template>
                <v-card class="white">

                    <v-text-field v-model="element.id" label="id" value="id"  filled>
                    </v-text-field>
                    <v-text-field v-model="element.name" label="name" value="name" filled>
                    </v-text-field>
                    <v-text-field v-model="element.departement" label="departement" value="departement" filled>
                    </v-text-field>
                    <v-text-field v-model="element.salary" label="salary" value="salary" v-direct="element.salary" filled></v-text-field>
                    <v-flex text-center align-center>
                        <v-btn color="primary" @click="cancel">
                            cancel
                        </v-btn>
                        <v-btn v-if="add" color="primary" @click="postData">
                            submit
                        </v-btn>
                        <v-btn v-else color="primary" @click="update">
                            update
                        </v-btn>


                    </v-flex>
                </v-card>
            </v-dialog>
        </v-form>
        <v-simple-table>
            <thead>
                <tr>
                    <th>id
                        <button @click="sortIdDescFn()"><span class="mdi mdi-arrow-down"></span></button>
                        <button @click="sortIdAscFn()"><span class="mdi mdi-arrow-up"></span></button>
                    </th>
                    <th>name
                        <button @click="sortNameDescFn()"><span class="mdi mdi-arrow-down"></span></button>
                        <button @click="sortNameAscFn()"><span class="mdi mdi-arrow-up"></span></button>
                    </th>
                    <th>departement
                        <button @click="sortDepartmentDescFn()"><span class="mdi mdi-arrow-down"></span></button>
                        <button @click="sortDepartmentAscFn()"><span class="mdi mdi-arrow-up"></span></button>
                    </th>
                    <th>salary
                        <button @click="sortSalaryDescFn()"><span class="mdi mdi-arrow-down"></span></button>
                        <button @click="sortSalaryAscFn()"><span class="mdi mdi-arrow-up"></span></button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(details,i) in arr" :key="i">

                    <td>{{details.id}}</td>
                    <td>{{details.name | trim }}</td>
                    <td>{{details.departement}}</td>
                    <td>{{details.salary}}</td>

                    <v-btn color="primary" @click="deleteData(details.id)">
                        Delete
                    </v-btn>
                    <v-btn color="primary" @click="editdata(details)">
                        edit

                    </v-btn>
                </tr>
            </tbody>
        </v-simple-table>
    </div>
</template>
<script>
import Vue from "vue"
import axios from "axios"
import VueAxios from "vue-axios"
import { getData, addData, deleteData, editData, sortDesc, sortAsc, ascName, descName, descDepartement, ascDepartement,ascSalary,descSalary } from '../service/apiFile'

Vue.use(VueAxios, axios)

export default {
    name: "studentTable",
    data() {
        return {
            link: "",
            res: '',
            valform: {},
            arr: [],
            element: {
                id: null,
                name: '',
                departement: ''
                ,salary:''
            },
            namerule: [
                name => !!name || 'Name is required',
                name => /^[a-zA-z]+$/.test(name) || 'Name must be valid'
            ],

            isEdit: false,
            row: '',
            dialog: false,
            add: true,

        }


    },
    mounted() {
        getData()
            .then((res) => {
                console.log(res)
                this.arr = res
            })

    },

    methods:
    {
        postData() {
            addData(this.element)
                .then((res) => {
                    console.log(res)
                    this.arr = res
                })
            this.dialog = false

        },

        async deleteData(id) {
            deleteData(id)
        },



        editdata(details) {
            this.add = false
            this.dialog = true
            this.valform = details
            this.element = details
        },
        update() {
            let test = this.arr.findIndex(temp => temp.id == this.valform.id)
            this.arr[test].element = this.details
            this.dialog = false
            this.add = true
            editData(this.element)
            this.revert()
            this.$refs.forms.reset()
        },
        sortIdAscFn() {
            sortAsc()
                .then((res) => {
                    console.log(res)
                    this.arr = res
                })
        },
        sortIdDescFn() {
            sortDesc()
                .then((res) => {
                    console.log(res)
                    this.arr = res
                })
        },
        sortNameAscFn() {
            ascName()
                .then((res) => {
                    console.log(res)
                    this.arr = res
                })

        },
        sortNameDescFn() {
            descName()
                .then((res) => {
                    console.log(res)
                    this.arr = res
                })

        },
        sortDepartmentAscFn() {
            ascDepartement()
                .then((res) => {
                    console.log(res)
                    this.arr = res

                })

        },

        sortDepartmentDescFn() {
            descDepartement()
                .then((res) => {
                    console.log(res)
                    this.arr = res
                })

        },
        sortSalaryAscFn() {
            ascSalary()
                .then((res) => {
                    console.log(res)
                    this.arr = res

                })

        },

        sortSalaryDescFn() {
            descSalary()
                .then((res) => {
                    console.log(res)
                    this.arr = res
                })

        },


        revert() {
            this.details.name = ''
            this.details.id = ''
            this.details.departement = ''
            this.details.salary = ''
        },
        cancel() {
            this.add = true
            this.dialog = false
            this.revert()
        },
        tableSearch(val) {
            this.arr = val.data

        }
    },






}



</script>