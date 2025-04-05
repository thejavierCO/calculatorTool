<script>
  export let time = 0;
  class timeFormat {
    constructor(TimeMillis) {
      this._current_time = TimeMillis;
    }
    get current() {
      return this._current_time;
    }
    get Hours() {
      return Math.trunc(this.current / 1000 / 60 / 60) % 60
    }
    HoursToSec(){
      return this.Hours*60*60
    }
    get Minutes() {
      return Math.trunc(this.current / 1000 / 60) % 60
    }
    MinutesToSec(){
      return this.Minutes*60
    }
    get Seconds() {
      return Math.trunc(this.current / 1000) % 60
    }
    SecondsToMilis(a){
      return a?a*1000:this.Seconds*1000
    }
    get Miliseconds() {
      return Math.trunc(this.current-this.SecondsToMilis(this.HoursToSec()+this.MinutesToSec()+this.Seconds))
    }
    get pad(){
        return {
            Hours:this.Hours.toString().padStart(2, "0"),
            Minutes:this.Minutes.toString().padStart(2, "0"),
            Seconds:this.Seconds.toString().padStart(2, "0"),
            Miliseconds:this.Miliseconds.toString().padStart(3, "0"),
        }
    }
    useRange(max) {
      return Number(
        parseFloat(((this.current * 1) / (max * 1000)).toString()).toFixed(3)
      );
    }
  }
</script>
<slot Data={new timeFormat(time)}></slot>