import java.io.*;
import java.util.*;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import java.lang.reflect.*;



public class SwapTest extends Base
 {
    @Test
   public void t1() throws java.io.IOException{
	hint = "public static void main() throws IOException {\n \n}";
	description = "Create a main method";
        Swap obj = new Swap();
	try {
		Method m=getMethod(obj,"main");
		String m1=m.toString();
	        assertEquals(m1,"public static void Swap.main() throws java.io.IOException");
     

    		}
        
	catch(Exception e){}
    
        }
@Test
    public void t2() throws java.io.IOException{
	hint = "br = new BufferedReader(new InputStreamReader(System.in));\n";
	description = "Use 'BufferedReader' to read input from user";
	Swap obj = new Swap();	
	 try {
	
		   Method m = getMethod(obj, "main");
		   if(m!=null)
		{

		    m.invoke(obj);
                    Object br = Base.getDebuggingObject();
		    assertEquals("java.io.BufferedReader", br.getClass().getName());
		   
		   }
	   } catch(Exception e){
             assertEquals(1, 0);
           }
	}


    @Test
    public void t3() throws java.io.IOException{
	hint = "a = Integer.parseInt(br.readLine());\n";
	description = "Take input in variable 'a'";
	Swap obj = new Swap();
	System.setIn(StubbedInputStream.stubInputStream().toReturn("10").atSomePoint());		
	 try {
	
		   Method m = getMethod(obj,"main");
		   if(m!=null)
		{
		    m.invoke(obj);
		    assertEquals("Enter the value of a:10\n", outContent.toString());
		   
		   }
	   }
	   catch(Exception e){}
					
	}

    @Test
    public void t4() throws java.io.IOException{
	hint = "b = Integer.parseInt(br.readLine());\n";
	description = "Take input in variable 'b'";
	Swap obj = new Swap();
	System.setIn(StubbedInputStream.stubInputStream().toReturn("10").then("20").atSomePoint());		
	 try {
	
		   Method m = getMethod(obj,"main");
		   if(m!=null)
		{
		    m.invoke(obj);
		    assertEquals("Enter the value of a:Enter the value of b:20\n", outContent.toString());
		   
		   }
	   }
	   catch(Exception e){}
					
	}

    	@Test
    public void t5() throws java.io.IOException{
	hint = "temp=a;";
	description = "Put the value of 'a' in 'temp' variable";
	Swap obj = new Swap();
 		System.setIn(StubbedInputStream.stubInputStream().toReturn("10").then("20").atSomePoint());	 	try {
	
	   	Method m = getMethod(obj,"main");
	   	if(m!=null)
		{
		    m.invoke(obj);
		    assertEquals("Enter the value of a:Enter the value of b:10\n", outContent.toString());
	   	}
	   }
	   catch(Exception e){}
					
	}

	@Test
    public void t6() throws java.io.IOException {
	hint = "a= b;";
	description = "Put the value of 'b' in 'a' variable";  
	Swap obj = new Swap();
 		System.setIn(StubbedInputStream.stubInputStream().toReturn("10").then("20").atSomePoint());	 	try {

	   	Method m = getMethod(obj,"main");
	   	if(m!=null)
		{
		    m.invoke(obj);
		    assertEquals("Enter the value of a:Enter the value of b:20\n", outContent.toString());
	   	}

	   }
	   catch(Exception e){}
}


	@Test
    public void t7() throws java.io.IOException {
	hint = "b = temp;";
  	description = "Put the value of 'temp' in 'b' variable";  
  	Swap obj = new Swap();
 		System.setIn(StubbedInputStream.stubInputStream().toReturn("10").then("20").atSomePoint());	 	try {

	   	Method m = getMethod(obj,"main");
	   	if(m!=null)
		{
		    m.invoke(obj);
		    assertEquals("Enter the value of a:Enter the value of b:10\n", outContent.toString());
	   	}

	   }
	   catch(Exception e){}
}

	@Test
	public void t8()throws java.io.IOException{
		hint = "System.out.println(\"The Value of a:\"+a);\nSystem.out.println(\"The Value of b:\"+b);";
		description = "Print the value of a and print the value of b";
		Swap obj = new Swap();
		System.setIn(StubbedInputStream.stubInputStream().toReturn("10").then("20").atSomePoint());
		try{
		Method m = getMethod(obj , "main");
		if(m!=null)
		{
			m.invoke(obj);
			assertEquals("Enter the value of a:Enter the value of b:The Value of a:20\nThe Value of b:10\n",outContent.toString());

		}
		}
		catch(Exception e){}
		
		
	}	
}

