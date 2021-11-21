<script>
import { Line } from "../../node_modules/vue-chartjs/es/BaseCharts";

export default {
  extends: Line,
  data: () => ({
    chartdata: {
      labels: [
        "January",
        "February",
        "February",
        "February",
        "February",
        "February",
        "February",
        "February",
      ],
      datasets: [
        {
          backgroundColor: "#f87979",

          data: [40, 20, 51, 31, 75, 21, 44, 12],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
    legend: {
      display: false
    }
  },
  animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    },
  }),

  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
