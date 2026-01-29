package com.example.applergymovil

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.Toast
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContentProviderCompat
import androidx.core.text.isDigitsOnly
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.lifecycle.lifecycleScope
import com.google.android.material.chip.Chip
import com.google.android.material.chip.ChipGroup
import com.google.android.material.textfield.TextInputLayout
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.firestore
import kotlinx.coroutines.launch
import kotlinx.coroutines.tasks.await

class Registro : AppCompatActivity() {

    private lateinit var user: TextInputLayout
    private lateinit var edad: TextInputLayout
    private lateinit var email: TextInputLayout
    private lateinit var passwd: TextInputLayout

    private lateinit var registro: Button


    private lateinit var auth: FirebaseAuth

    private lateinit var chipgroup: ChipGroup



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_registro)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }

        user = findViewById(R.id.user)
        edad = findViewById(R.id.edad)
        email = findViewById(R.id.email)
        passwd = findViewById(R.id.contra)

        registro = findViewById(R.id.registro)

        auth = FirebaseAuth.getInstance()
        val fire = com.google.firebase.Firebase.firestore


        chipgroup = findViewById(R.id.chipgroup)
        var alergias: ArrayList<String> = ArrayList()
        var userAler: ArrayList<String> = ArrayList()

        lifecycleScope.launch {
            alergias = getLergies(fire)
            Log.d("T", ""+alergias.size)
            chipgroup.removeAllViews()

            for (aler in alergias) {
                val chip = com.google.android.material.chip.Chip(this@Registro)
                chip.text = aler
                chip.isCheckable = true
                chip.setCheckedIconVisible(true)

                chipgroup.addView(chip)
            }



        }


        registro.setOnClickListener() {
            var fullNom: String? = user.editText!!.text.toString()
            var edad: String? = edad.editText!!.text.toString()
            var email: String? = email.editText!!.text.toString()
            var passwd: String? = passwd.editText!!.text.toString()
            var idAler: String? = " "

            lifecycleScope.launch {
                for (chip in 0 until chipgroup.childCount) {
                    if ((chipgroup.getChildAt(chip) as Chip).isChecked) {
                        userAler.add((chipgroup.getChildAt(chip) as Chip).text.toString())
                    }
                }

                var ids = getLergiesIdNom(fire, userAler)

                for (n in ids) {
                    idAler += n.toString()
                    if (ids.last() != n) {
                        idAler += ","
                    }
                }

                if (fullNom.isNullOrBlank() || edad.isNullOrBlank() ||
                    email.isNullOrBlank() || passwd.isNullOrBlank() ||
                    !edad!!.isDigitsOnly()) {
                    Toast.makeText(
                        baseContext,
                        "Algun campo está vacío o no es válido",
                        Toast.LENGTH_SHORT,
                    ).show()
                } else {
                    registrar(email!!, passwd!!)
                    val usuario = hashMapOf(
                        "id" to getLastId(fire)+1,
                        "fullNom" to fullNom,
                        "edad" to edad,
                        "email" to email,
                        "alergias" to idAler
                    )

                    fire.collection("usuarios")
                        .add(usuario)
                        .addOnSuccessListener { documentReference ->
                            Toast.makeText(
                                baseContext,
                                "Base de datos actualizada",
                                Toast.LENGTH_SHORT,
                            ).show()
                        }
                        .addOnFailureListener { e ->
                            Toast.makeText(
                                baseContext,
                                "Base de datos no modificada",
                                Toast.LENGTH_SHORT,
                            ).show()
                        }

                Log.d("T", idAler!!)

            }



            }
        }
    }

    private fun registrar(email: String, passwd: String) {
        auth.createUserWithEmailAndPassword(email, passwd)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    val user = auth.currentUser
                    Toast.makeText(
                        baseContext,
                        "Registro completado",
                        Toast.LENGTH_SHORT,
                    ).show()
                    val intent: Intent = Intent(applicationContext, MainActivity::class.java)
                    startActivity(intent)
                } else {
                    Toast.makeText(
                        baseContext,
                        "Registro fallido",
                        Toast.LENGTH_SHORT,
                    ).show()
                }
            }
    }

    private fun getLastId(fire: FirebaseFirestore): Int {
        var id: Int = 0

    fire.collection("usuarios")
        .get()
        .addOnSuccessListener { result ->
            for (documento in result) {
                if (documento.get("id").toString().toInt() > id) {
                    id = documento.get("id").toString().toInt()
                }
            }
            
    }
        return id
    }

    private suspend fun getLergiesIdNom(fire: FirebaseFirestore, noms: List<String>): ArrayList<Int> {
        var alergias: ArrayList<Int> = ArrayList()
        Log.d("T", ""+noms.size)

        for (n in noms) {
            val result = fire.collection("alergias")
                .whereEqualTo("nom", n)
                .get()
                .await()

            try {
                for (documento in result) {
                    alergias.add(documento.get("allergy_id").toString().toInt())
                }
            } catch (e: Exception) {
                Log.d("T", "Error")
            }
        }

        Log.d("T", ""+alergias.size)
        return alergias
    }

    private suspend fun getLergies(fire: FirebaseFirestore): ArrayList<String> {
        var alergias: ArrayList<String> = ArrayList()
        val result = fire.collection("alergias")
            .get()
            .await()

        try {
            for (documento in result) {
                alergias.add(documento.get("nom").toString())
            }
        } catch (e: Exception) {
            Log.d("T", "Error")
        }


        Log.d("T", ""+alergias.size)
        return alergias
    }
}