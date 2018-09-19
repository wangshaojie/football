<template>
  <div class="wrapper fadeInDown" id="login">
	  <div id="formContent">
	    <!-- Tabs Titles -->
	    <h2 class="active"> Sign In </h2>
	    <h2 class="inactive underlineHover">Sign Up </h2>

		    <!-- Icon -->
	    <div class="fadeIn first">
	      <img src="../../assets/icon.svg" id="icon" alt="User Icon" />
	    </div>

	    <!-- Login Form -->
	    <form @submit.prevent="validateBeforeSubmit">
	    	<group>
	    		<input name="name" v-model="username" v-validate="'required|alpha'" 
	    		:class="{'input': true, 'is-danger': errors.has('name')}" class="fadeIn second" type="text" placeholder="Name">
                <i v-show="errors.has('name')" class="fa fa-warning"></i>
                <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
		  	</group>
		  	<group>
                    <input name="password" v-validate="'required|min:6'" :class="{'input': true, 'is-danger': errors.has('password') }" class="fadeIn third"
                     type="password" placeholder="Password">
                    <i v-show="errors.has('password')" class="fa fa-warning"></i>
                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}
                    </span>
	  		</group>
	      <input type="submit" class="fadeIn fourth" value="登录">
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
  	validateBeforeSubmit(){
  		this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          alert('Form Submitted!');
          return;
        }
        alert('Correct them errors!');
      });
  		console.log(this.username)
  	}
  },
  mounted(){
  	this.$nextTick(function(){
  		this.$vux.toast.show({
		 text: 'Loading'
		})
  	})
  	
  }
}
</script>