<template>

  <b-container>

            <!-- localstorage saving form -->
            <b-form class="header-form" v-if="!save" inline @submit.prevent="handleSaveSubmit">
                   <b-form-input
                      id="inline-form-input-name"
                      class="mb-2 mr-sm-2 mb-sm-0"
                      v-model="calcName"
                      placeholder="Enter Calculation Name"
                   ></b-form-input>
                   <button type='submit'>Save</button>
                   <button @click="toggleSave">Cancel</button>
               </b-form>

              <!--  -->

                <!-- header container -->
             <div class="header" v-if="visible">
              <h2 class='header-title'>Income Calculation</h2>
              <div class="header-icons-container">

                 <!-- this dropdown showes saved calculations -->
                 <b-dropdown size='sm' variant="link" toggle-class="text-decoration-none" no-caret>
                   <template #button-content>
                     <b-icon id='popover-target-2' class='header-icons-container-icon' icon="search" scale="2"></b-icon>
                       <b-popover target="popover-target-2" triggers="hover" placement="top">
                         saved calculations
                    </b-popover>
                   </template>
                   <b-dropdown-item   @click.stop="getStorage(key)" v-for="(key) in localStorageArray" :key="key">
                       <div class="d-flex justify-content-between">
                        {{key}} <b-icon class="ml-3" icon='trash' variant='danger' @click.stop="removeFromList(key)"></b-icon>
                        </div>
                    </b-dropdown-item>
                </b-dropdown>
                   <!--  -->
               
          <b-icon 
            id="popover-target-1"
            class='header-icons-container-icon' 
            @click="toggleSave" icon="file-earmark-arrow-up" 
            scale="2">
           </b-icon>
           <b-popover target="popover-target-1" triggers="hover" placement="top">
              save
          </b-popover>

          <b-icon :class="visible ? null : 'collapsed'"
                  :aria-expanded="visible ? 'true' : 'false'"
                  aria-controls="collapse-4"
                  icon="dash"
                  class='header-icons-container-icon'
                  id='popover-target-3'
                  @click="visible = !visible">
              </b-icon>
                 <b-popover target="popover-target-3" triggers="hover" placement="top">
                   minimize
                </b-popover>
              </div>
             </div>

              <!-- ====== -->

             <div v-else class="header-collapse-container">
                  V.A.T calculation
                 <b-icon :class="visible ? null : 'collapsed'"
                    :aria-expanded="visible ? 'true' : 'false'"
                    aria-controls="collapse-4"
                    icon="chevron-down"
                    @click="visible = !visible">
              </b-icon>
             </div>

             <!-- calculation container -->
      <b-collapse id="collapse-4" v-model="visible">
          <div class="calculation-container">
                  <div class="calculation-container-content">
                        <b-form-checkbox v-model="checked" name="check-button" switch>
                          <b>Pension tax <span v-if="checked">2%</span> <span v-else>0</span></b>
                        </b-form-checkbox>
                        <div class="calculation-container-content-inputs">
                          <span>Taxable salary</span>
                          <input placeholder="Gel" v-model="salary" v-on:keyup="changeForSalary" :class="[salary.length < 1 ? 'gray' : 'green']"/>
                       </div>
                       <div class="calculation-container-content-inputs">
                          <span>Employee salary</span>
                          <input  placeholder="Gel"  v-model="txSalary" v-on:keyup="changeFortxSalary" :class="[txSalary.length < 1 ? 'gray' : 'green']"/>
                     </div>
                      <div class="calculation-container-content-inputs">
                         <span>Transfer to the budget</span>
                         <span class="unchanged-inputs">
                            {{data.budget}}
                            <span v-if="salary || txSalary" class="float-right mr-2 mt-1">Gel</span>
                          </span>
                      </div>
                       <div class="calculation-container-content-inputs">
                           <span>Payable to the Pension Agency</span>
                           <span class="unchanged-inputs">
                             {{data.pensionAgency}}
                           <span v-if="salary || txSalary" class="float-right mr-2 mt-1">Gel</span>
                           </span>
                       </div>
                       <div class="calculation-container-content-inputs">
                         <span>Total</span>
                          <span class="unchanged-inputs">
                            {{data.total}}
                            <span v-if="salary || txSalary" class="float-right mr-2 mt-1">Gel</span>
                            </span>
                       </div>
                    </div>
               <button class="remove-button" @click='removeFromInputs'>Remove</button>
           </div>
       </b-collapse>

       <!-- ======= -->
       
  </b-container>
</template>

<script>
export default {
  name: "Calculator",
  data(){
     return {
       visible : true,
       save: true,
       checked: true,
       calcName: '',
       salary: '',
       localStorageArray: [],
       txSalary: '',
       tax: 0,
       data : {
         salary : '',
         txSalary: '',
         budget : '',
         pensionAgency: '',
         total: ''
       }
     }
  },
  mounted() {

     // getting keys from localstorage
     this.localStorageArray = Object.keys(localStorage).filter(key => key !== 'loglevel:webpack-dev-server')
  },
  methods: {
     changeForSalary(){

       // calculates  when taxable salary is filled
         if(this.checked){
           this.tax = 2/100
         } else {
           this.tax = 0
         }
         this.data.salary = Number(this.salary),
         this.txSalary = (this.data.salary * (1 - this.tax) * 0.8).toFixed(2)
         this.data.txSalary = (this.data.salary * (1 - this.tax) * 0.8).toFixed(2)
         this.data.budget = (this.data.salary * (1 - this.tax) * 0.2).toFixed(2),
         this.data.pensionAgency = (this.data.salary * this.tax * 2).toFixed(2),
         this.data.total = Number(Number(this.data.txSalary) + Number(this.data.budget) + Number(this.data.pensionAgency)).toFixed(2)
     },
     changeFortxSalary(){
       if(this.checked){
           this.tax = 2/100
         } else {
           this.tax = 0
         }

          // calculates when,  ''Amount to be transferred to the employee'' is filled
         this.data.txSalary = Number(this.txSalary),
         this.salary = (this.txSalary / (1 - this.tax) / 0.8).toFixed(2),
         this.data.salary = (this.txSalary / (1 - this.tax) / 0.8).toFixed(2),
         this.data.budget = (this.data.salary * (1 - this.tax) * 0.2).toFixed(2),
         this.data.pensionAgency = (this.data.salary * this.tax * 2).toFixed(2),
         this.data.total = Number(Number(this.data.txSalary) + Number(this.data.budget) + Number(this.data.pensionAgency)).toFixed(2)
     },
     removeFromInputs (){

       // removes all calculation from inputs
       this.salary = '',
       this.txSalary = '',
       this.data.salary = '',
       this.data.txSalary = '',
       this.data.budget = '',
       this.data.pensionAgency = '',
       this.data.total = ''
     },
     toggleSave(){
        this.save = !this.save
     },
      handleSaveSubmit (){
        window.localStorage.setItem(this.calcName, JSON.stringify(this.data))
        this.localStorageArray = Object.keys(localStorage).filter(key => key !== 'loglevel:webpack-dev-server')
        this.save = true
        this.calcName = ''
     },
     getStorage(key){

        // getting data from localstorage, and filled inputs 
       const getdataFromlocal = JSON.parse(window.localStorage.getItem(key));
       this.data = getdataFromlocal
       this.salary = getdataFromlocal.salary;
       this.txSalary = getdataFromlocal.txSalary
     },
     removeFromList(key){

       // removes saved calculation
      window.localStorage.removeItem(key)
      this.localStorageArray = Object.keys(localStorage).filter(key => key !== 'loglevel:webpack-dev-server')
      this.removeFromInputs()
     }
  }
}

</script>

<style lang="scss">

.green {
  border: 2.5px solid #00d369;
}

.gray {
  border: 2.5px solid rgba(0, 0, 0, 0.2);
}



</style>