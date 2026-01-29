package com.example.applergymovil

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.google.android.material.textfield.TextInputLayout
import com.google.firebase.FirebaseApp
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.Firebase

class MainActivity : AppCompatActivity() {

    private lateinit var user: TextInputLayout
    private lateinit var contra: TextInputLayout
    private lateinit var enviar: Button
    private lateinit var registro: Button
    private lateinit var aut: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
        FirebaseApp.initializeApp(this)

        aut = FirebaseAuth.getInstance()
        user = findViewById<TextInputLayout>(R.id.user)
        contra = findViewById<TextInputLayout>(R.id.contra)
        enviar = findViewById<Button>(R.id.enviar)
        registro = findViewById<Button>(R.id.registro)

        enviar.setOnClickListener() {
            var nom: String = user.editText!!.text.toString()
            var passwd: String = contra.editText!!.text.toString()

            if (nom.isNullOrBlank() || passwd.isNullOrBlank()) {
                Toast.makeText(
                    baseContext,
                    "Alguno de los campos está vacío o no es válido",
                    Toast.LENGTH_SHORT,
                ).show()
            } else {
                enviar(nom, passwd)
            }
        }

        registro.setOnClickListener() {
            val intent: Intent = Intent(applicationContext, Registro::class.java)
            startActivity(intent)
        }
    }

    private fun enviar(nom: String, passwd: String) {
        aut.signInWithEmailAndPassword(nom, passwd)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    val user = aut.currentUser
                    val intent: Intent = Intent(this, Principal::class.java)
                    startActivity(intent)
                } else {
                    Toast.makeText(
                        baseContext,
                        "Error de autenticación",
                        Toast.LENGTH_SHORT,
                    ).show()
                }
            }
    }
}