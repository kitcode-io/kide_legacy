import java.io.*;

public class Palindrome{
	
    public static void main() throws IOException{
	BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
	int a;
	System.out.print("Enter a number:");
	a = Integer.parseInt(br.readLine());
	int temp,r,sum = 0;
	temp=a; 
	while(a>0){
		r=a%10; 
		a=a/10;
		sum=(sum*10)+r;
	}
	if(temp==sum)
        System.out.println("palindrome");
	//=========== Write your code within the block ===========//
	//IGNORE
	else{
             System.out.println("Not palindrome");
         }
	//END
	//========================================================//

    }

} 


