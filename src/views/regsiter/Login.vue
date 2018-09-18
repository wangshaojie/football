<template>
  <div class="wrapper fadeInDown" id="login">
	  <div id="formContent">
	    <!-- Tabs Titles -->
	    <h2 class="active"> Sign In </h2>
	    <h2 class="inactive underlineHover">Sign Up </h2>

		    <!-- Icon -->
	    <div class="fadeIn first">
	      <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
	    </div>

	    <!-- Login Form -->
	    <form>
	    	<group>
		    	<x-input type="text" placeholder="username" 
		    	v-model="username"
		    	required 
		    	class="fadeIn second" ></x-input>
		  	</group>
		  	<group>
		  		<x-input type="password" placeholder="password" 
		  		v-model="password"
		  		required
		  		class="fadeIn third"></x-input>
	  		</group>
	      <input type="submit" class="fadeIn fourth" v-on:click="submitForm">
	    </form>

	   <!-- Remind Passowrd -->
	    <div id="formFooter">
	      <a class="underlineHover" href="#">Forgot Password?</a>
	    </div>
	  </div>
  </div>
</template>

<style lang="less">
	@import "../../assets/styles/login.less";
	.underlineHover{
		color:@color;
	}

</style>


<script>
import { Group, Cell, XInput } from 'vux'

export default {
  components: {
    Group,
    Cell,
    XInput
  },
  data(){
  	return {
  		username : null,
  		password : null
  	}
  },
  methods:{
  	submitForm(){
  		console.log(this.username)
  	}
  },
  mounted(){
  	this.$vux.toast.show({
	 text: 'Loading'
	})
  }
}
</script>