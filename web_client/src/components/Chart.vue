<script>
import { Line } from '../../node_modules/vue-chartjs/es/BaseCharts';
import {mixins} from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
  extends: Line,
  mixins:[reactiveProp],
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};



// import axios from 'axios';
// export default {
//   extends:Line,
//   name: 'Market',
//   data() {
//     return {
//       akInfo: [],
//       akKurs: [],
//       akByTime: [],
//       akByTimeWert: [],
//       akwertarraytagtest:[],
//       chartdata:{
//         labels: this.akByTime,
//       datasets: [
//         {
//           backgroundColor: "#f87979",

//           data: this.akByTime,
//         },
//       ],
//     }
//     };

//   },
//   methods: {
//     async getKurs() {
//       this.akKurs = (
//         await axios.get(
//           `http://localhost:5000/akDetailKurs/${this.akInfo.isin}`
//         )
//       ).data;
//     },
//     async oneDay() {
//       const today = new Date();
//       const yesterday = today.getDate() - 1;
//       const yesterdayDate =
//         today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + yesterday;
//       console.log(yesterdayDate);
//       this.akByTime = (
//         await axios.get(
//           `http://localhost:5000/kursByTime/${this.isin}?date=${yesterdayDate}`
//         )
//       ).data;
//       this.wertExtraktion();
//     },
//     async oneWeek() {
//       const today = new Date();
//       const yesterday = today.getDate() - 7;
//       const yesterdayDate =
//         today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + yesterday;
//       console.log(yesterdayDate);
//       this.akByTime = (
//         await axios.get(
//           `http://localhost:5000/kursByTime/${this.isin}?date=${yesterdayDate}`
//         )
//       ).data;
//       this.wertExtraktion();
//     },
//     async Test(){
//       this.akwertarraytagtest = (
//           await axios.get(
//             `http://localhost:5000/kursByTime/DE000A1EWWW0?date=2022-01-01`
//           )
//         ).data;
//     },
//     async oneMonth() {
//       const today = new Date();
//       // const yesterday = today.getDate() - 31;
//       let lastMonth;
//       if (today.getMonth() + 1 == 1) {
//         lastMonth = 12;
//         let lastYear = today.getFullYear() - 1;
//         const yesterdayDate =
//           lastYear + '-' + lastMonth + '-' + today.getDate();
//         console.log(yesterdayDate);
//         this.akByTime = (
//           await axios.get(
//             `http://localhost:5000/kursByTime/${this.isin}?date=${yesterdayDate}`
//           )
//         ).data;
//       } else {
//         const yesterdayDate =
//           today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
//         console.log(yesterdayDate);
//         this.akByTime = (
//           await axios.get(
//             `http://localhost:5000/kursByTime/${this.isin}?date=${yesterdayDate}`
//           )
//         ).data;
//       }
//       this.wertExtraktion();
//     },
//     wertExtraktion() {
//       this.akByTimeWert = [];
//       for (let elm of this.akByTime) {
//         this.akByTimeWert.push(elm.wert);
//       }
//       console.log(this.akByTimeWert);
//     },
//   },
//   mounted() {
//     this.renderChart(this.chartdata, this.options);
//   },
//   async created() {
//     this.akInfo = (
//       await axios.get(`http://localhost:5000/akDetail/${this.isin}`)
//     ).data[0];
//     this.Test();
//     console.log(this.akwertarraytagtest);
//     console.log("Test");
//     this.getKurs();
//   },

//   props: {
//     isin: {
//       type: String,
//     },
//   },
// };
</script>

<style lang="scss" scoped></style>
