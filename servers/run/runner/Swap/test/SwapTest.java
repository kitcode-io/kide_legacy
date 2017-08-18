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
	instruction = "public : its the access specifier means\nfrom every where we can access it.\n\nstatic : access modifier means we can call\nthis method directly using class name\nwithout creating an object of it.\n\nvoid : it is a return type i.e it does\nnot return any value.\n\nmain() : it is a method name.\n\nstring args[] : its a command line argument\nit is a collection of variables in the string\nformat.\n";
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
	instruction = "br : Object of BufferedReader class.\n\nInputStreamReader: InputStreamReader is a\nsubclass of Reader class. It converts bytes\nto character.\n\nSystem.in: Console inputs are read from this.";
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
	instruction = "Integer.parseInt() method parses the string\nargument as a integer.";
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
	instruction = "Integer.parseInt() method parses the string\nargument as a integer.";
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
	instruction = "Exchange the value between two variable\nStore the value of 'c' into another variable\n'b'. Ex: b=c;";
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
	instruction = "Exchange the value between two variable\nStore the value of 'c' into another variable\n'b'. Ex: b=c;";
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
	instruction = "Exchange the value between two variable\nStore the value of 'c' into another variable\n'b'. Ex: b=c;";
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
		instruction = "System: It is a class in the java.lang package.\n\nout: It is a static member of the System\nclass, and is an instance of java.io.PrintStream.\n\nprintln: It is a method of java.io.PrintStream.\nThis method is overloaded to print message to\noutput destination, which is typically a\nconsole or file.";
		hint = "System.out.println(\"The value of a:\"+a);\nSystem.out.println(\"The value of b:\"+b);";
		description = "Print the value of a and print the value of b";
		Swap obj = new Swap();
		System.setIn(StubbedInputStream.stubInputStream().toReturn("10").then("20").atSomePoint());
		try{
		Method m = getMethod(obj , "main");
		if(m!=null)
		{
			m.invoke(obj);
			assertEquals("Enter the value of a:Enter the value of b:The value of a:20\nThe value of b:10\n",outContent.toString());

		}
		}
		catch(Exception e){}
		
		
	}	
}

