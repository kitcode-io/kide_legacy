import java.io.*;

public class Automorphic{
	
   public static void main() throws IOException{
	BufferedReader br = null;
	br = new BufferedReader(new InputStreamReader(System.in));
	int a=0;
	System.out.print("Input the number:");
	a = Integer.parseInt(br.readLine());
	int b=0,dup=0,i=0,j=1,auto=0;
	dup=a;
	do{	
		b=a%10;
		a=a/10;
		i++;
	}while(a!=0);
	a=dup;
	a =a *a;
	do
	{
		b=a%10;
		a=a/10;			
		auto = (b*j) + auto;
		j=10;			
		i--;
    		
	}while(i!=0);
	if(auto == dup)
		System.out.println("Automorphic Number");
	
	//=========== Write your code within the block ===========//
	else
		System.out.println("Not an Automorphic Number");
	//========================================================//
	
    }
	


}

