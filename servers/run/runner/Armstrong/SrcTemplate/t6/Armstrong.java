import java.io.*;

public class Armstrong{
	
    public static void main() throws IOException{
	BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
	int a;
	System.out.print("Input the number:");
	a = Integer.parseInt(br.readLine());
	int b,dup,sum=0;
	dup=a;
	do{
		b=a%10;
		a=a/10;
	//=========== Write your code within the block ===========//
	//IGNORE
		sum = sum + (b * b * b);
	//END
	//========================================================//
		System.out.println(+sum);
	}while(a!=0);

    }

}

